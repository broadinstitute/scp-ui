import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appColor } from 'modules/theme';

import { getSearchInputs } from 'actions/index';
import { STATUS } from 'constants/index';

import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const Item = styled(Link)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

export class FiltersList extends React.Component {
  state = {
    // query: 'organism=mus-musculus%20AND%20disease=glioma',
    query: 'react',
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(getSearchInputs(query));
  }

  render() {
    const { query } = this.state;
    const { search } = this.props;
    const data = search.inputs.data[query] || [];
    let output;

    if (search.inputs.status === STATUS.READY) {
      if (data.length) {
        output = (
          <ul>
            {search.inputs.data[query].map(d => (
              <li key={d.id}>
                <Item href={d.html_url} target="_blank">
                  <Image src={d.owner.avatar_url} alt={d.owner.login} />
                  <ItemHeader>
                    <Heading as="h5" lineHeight={1}>
                      {d.name}
                    </Heading>
                    <small>{d.owner.login}</small>
                  </ItemHeader>
                  <Paragraph>{d.description}</Paragraph>
                </Item>
              </li>
            ))}
          </ul>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="FiltersList" data-testid="FiltersListWrapper">
        <Flex justifyContent="center">
          <ButtonGroup role="group" aria-label="GitHub Selector" data-testid="GitHubSelector">
            <Button
              animate={query === 'react' && search.inputs.status === 'running'}
              bordered={query !== 'react'}
              size="lg"
              data-query="react"
              onClick={this.handleClick}
            >
              React
            </Button>
            <Button
              animate={query === 'redux' && search.inputs.status === 'running'}
              bordered={query !== 'redux'}
              size="lg"
              data-query="redux"
              onClick={this.handleClick}
            >
              Redux
            </Button>
          </ButtonGroup>
        </Flex>
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { search: state.search };
}

export default connect(mapStateToProps)(FiltersList);
