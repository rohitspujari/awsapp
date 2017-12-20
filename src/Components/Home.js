import React, { Component } from 'react';
import {
  Container,
  Grid,
  Image,
  Header,
  Icon,
  Menu,
  Segment
} from 'semantic-ui-react';
class Home extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <Menu.Item
              name="bio"
              active={activeItem === 'bio'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="pics"
              active={activeItem === 'pics'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="companies"
              active={activeItem === 'companies'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="links"
              active={activeItem === 'links'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            Wikipedia began with its launch on 15 January 2001, two days after
            the domain was registered[2] by Jimmy Wales and Larry Sanger. Its
            technological and conceptual underpinnings predate this; the
            earliest known proposal for an online encyclopedia was made by Rick
            Gates in 1993,[3] but the concept of a free-as-in-freedom online
            encyclopedia (as distinct from mere open source)[4] was proposed by
            Richard Stallman in December 2000.[5] Crucially, Stallman's concept
            specifically included the idea that no central organization should
            control editing. This characteristic was in stark contrast to
            contemporary digital encyclopedias such as Microsoft Encarta,
            Encyclopædia Britannica, and even Bomis's Nupedia, which was
            Wikipedia's direct predecessor. In 2001, the license for Nupedia was
            changed to GFDL, and Wales and Sanger launched Wikipedia using the
            concept and technology of a wiki pioneered in 1995 by Ward
            Cunningham.[6] Initially, Wikipedia was intended to complement
            Nupedia, an online encyclopedia project edited solely by experts, by
            providing additional draft articles and ideas for it. In practice,
            Wikipedia quickly overtook Nupedia, becoming a global project in
            multiple languages and inspiring a wide range of other online
            reference projects. According to Alexa Internet, as of 8 October
            2017, Wikipedia is the world's fifth-most-popular website in terms
            of overall visitor traffic.[7] Wikipedia's worldwide monthly
            readership is approximately 495 million.[8] Worldwide in August
            2015, WMF Labs tallied 18 billion page views for the month.[9]
            According to comScore, Wikipedia receives over 117 million monthly
            unique visitors from the United States alone.[10] Wikipedia began
            with its launch on 15 January 2001, two days after the domain was
            registered[2] by Jimmy Wales and Larry Sanger. Its technological and
            conceptual underpinnings predate this; the earliest known proposal
            for an online encyclopedia was made by Rick Gates in 1993,[3] but
            the concept of a free-as-in-freedom online encyclopedia (as distinct
            from mere open source)[4] was proposed by Richard Stallman in
            December 2000.[5] Crucially, Stallman's concept specifically
            included the idea that no central organization should control
            editing. This characteristic was in stark contrast to contemporary
            digital encyclopedias such as Microsoft Encarta, Encyclopædia
            Britannica, and even Bomis's Nupedia, which was Wikipedia's direct
            predecessor. In 2001, the license for Nupedia was changed to GFDL,
            and Wales and Sanger launched Wikipedia using the concept and
            technology of a wiki pioneered in 1995 by Ward Cunningham.[6]
            Initially, Wikipedia was intended to complement Nupedia, an online
            encyclopedia project edited solely by experts, by providing
            additional draft articles and ideas for it. In practice, Wikipedia
            quickly overtook Nupedia, becoming a global project in multiple
            languages and inspiring a wide range of other online reference
            projects. According to Alexa Internet, as of 8 October 2017,
            Wikipedia is the world's fifth-most-popular website in terms of
            overall visitor traffic.[7] Wikipedia's worldwide monthly readership
            is approximately 495 million.[8] Worldwide in August 2015, WMF Labs
            tallied 18 billion page views for the month.[9] According to
            comScore, Wikipedia receives over 117 million monthly unique
            visitors from the United States alone.[10] Wikipedia began with its
            launch on 15 January 2001, two days after the domain was
            registered[2] by Jimmy Wales and Larry Sanger. Its technological and
            conceptual underpinnings predate this; the earliest known proposal
            for an online encyclopedia was made by Rick Gates in 1993,[3] but
            the concept of a free-as-in-freedom online encyclopedia (as distinct
            from mere open source)[4] was proposed by Richard Stallman in
            December 2000.[5] Crucially, Stallman's concept specifically
            included the idea that no central organization should control
            editing. This characteristic was in stark contrast to contemporary
            digital encyclopedias such as Microsoft Encarta, Encyclopædia
            Britannica, and even Bomis's Nupedia, which was Wikipedia's direct
            predecessor. In 2001, the license for Nupedia was changed to GFDL,
            and Wales and Sanger launched Wikipedia using the concept and
            technology of a wiki pioneered in 1995 by Ward Cunningham.[6]
            Initially, Wikipedia was intended to complement Nupedia, an online
            encyclopedia project edited solely by experts, by providing
            additional draft articles and ideas for it. In practice, Wikipedia
            quickly overtook Nupedia, becoming a global project in multiple
            languages and inspiring a wide range of other online reference
            projects. According to Alexa Internet, as of 8 October 2017,
            Wikipedia is the world's fifth-most-popular website in terms of
            overall visitor traffic.[7] Wikipedia's worldwide monthly readership
            is approximately 495 million.[8] Worldwide in August 2015, WMF Labs
            tallied 18 billion page views for the month.[9] According to
            comScore, Wikipedia receives over 117 million monthly unique
            visitors from the United States alone.[10] Wikipedia began with its
            launch on 15 January 2001, two days after the domain was
            registered[2] by Jimmy Wales and Larry Sanger. Its technological and
            conceptual underpinnings predate this; the earliest known proposal
            for an online encyclopedia was made by Rick Gates in 1993,[3] but
            the concept of a free-as-in-freedom online encyclopedia (as distinct
            from mere open source)[4] was proposed by Richard Stallman in
            December 2000.[5] Crucially, Stallman's concept specifically
            included the idea that no central organization should control
            editing. This characteristic was in stark contrast to contemporary
            digital encyclopedias such as Microsoft Encarta, Encyclopædia
            Britannica, and even Bomis's Nupedia, which was Wikipedia's direct
            predecessor. In 2001, the license for Nupedia was changed to GFDL,
            and Wales and Sanger launched Wikipedia using the concept and
            technology of a wiki pioneered in 1995 by Ward Cunningham.[6]
            Initially, Wikipedia was intended to complement Nupedia, an online
            encyclopedia project edited solely by experts, by providing
            additional draft articles and ideas for it. In practice, Wikipedia
            quickly overtook Nupedia, becoming a global project in multiple
            languages and inspiring a wide range of other online reference
            projects. According to Alexa Internet, as of 8 October 2017,
            Wikipedia is the world's fifth-most-popular website in terms of
            overall visitor traffic.[7] Wikipedia's worldwide monthly readership
            is approximately 495 million.[8] Worldwide in August 2015, WMF Labs
            tallied 18 billion page views for the month.[9] According to
            comScore, Wikipedia receives over 117 million monthly unique
            visitors from the United States alone.[10]
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;
