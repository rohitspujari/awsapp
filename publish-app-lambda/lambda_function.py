import boto3 
from botocore.client import Config
import StringIO
import zipfile
import ConfigParser

def lambda_handler(event, context):
    
    # Get Resources from .ini file
    conf_file = ConfigParser.ConfigParser()
    conf_file.read('resources.ini')
    sns_topic = conf_file.get('resource', 'sns_topic')
    b_bucket = conf_file.get('resource', 'build_bucket')
    p_bucket = conf_file.get('resource', 'publish_bucket')
    artifact = conf_file.get('resource', 'artifact')
    
    sns = boto3.resource('sns')
    topic = sns.Topic(sns_topic)
    
    s3 = boto3.resource('s3',config=Config(signature_version='s3v4'))
    
    try:
        build_bucket = s3.Bucket(b_bucket)
        publish_bucket = s3.Bucket(p_bucket)
        zipped_app = StringIO.StringIO() # In-memory location 
        build_bucket.download_fileobj(artifact, zipped_app) # Download the artifact in in-memory location
        
        with zipfile.ZipFile(zipped_app) as myzip:
            for f in myzip.namelist():
                obj = myzip.open(f)
                publish_bucket.upload_fileobj(obj, f)
                publish_bucket.Object(f).Acl().put(ACL='public-read')
                
        print 'Job done!'
        topic.publish(Subject='App Deployed', Message=conf_file.get('message', 'success'))
        
    except:
        topic.publish(Subject='App Deploy Failed', Message=conf_file.get('message', 'fail'))
        raise
    
    return 'Lambda Execution Finished.'