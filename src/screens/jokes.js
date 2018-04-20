import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Spinner
} from "native-base";
import { TouchableNativeFeedback, ScrollView, FlatList, Text } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import D3 from './D3'
// import styles from "./styles";

class Jokes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      jokes: null,
      loading: true
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  _onRefresh() {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  componentWillReceiveProps(nexProps) {
    if (!nexProps.data.error && !nexProps.data.loading) {
      this.setState({
        jokes: nexProps.data.allJokes,
        loading: nexProps.data.loading
      })
    }
  }
  render() {
    const { jokes, loading } = this.state
    if (loading) {
      return (
        <Spinner color="#031828" />
      )
    }
    return (
      <Container>
        <Header iosBarStyle="dark-content" androidStatusBarColor="#031828" style={{ backgroundColor: '#031828' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Jokes</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='star' />
            </Button>
          </Right>
        </Header>

        <Content padder style={{ backgroundColor: '#e5e7e9' }}>
          {/* <List dataArray={jokes}
            renderRow={(item) =>
              <ListItem icon>
                <Left />
                <Body>
                  <Text style={{ color: '#ffffff' }}>{item}</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward" />
                </Right>
              </ListItem>
            }> */}
          <ScrollView>
            <List>

              <FlatList
                // refreshControl={
                //   <RefreshControl 
                //     refreshing={this.state.refresing}
                //     onRefresh={this._onRefresh.bind(this)}
                //   />
                // }
                data={jokes}
                initialNumToRender={15}
                maxToRenderPerBatch={1}
                removeClippedSubviews={false}
                renderItem={({ item }) =>
                  <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('D3', { ...item })}>
                    <ListItem icon>
                      <Left />
                      <Body>
                        <Text>{item.title}</Text>
                      </Body>
                      <Right>
                        <Icon name="ios-arrow-forward" />
                      </Right>
                    </ListItem>
                  </TouchableNativeFeedback>
                }
                keyExtractor={item => item.id}
              />
            </List>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const fetchJokes = gql`
  query{
    allJokes{
      id
      title
      content
      category
  }
}
`;
export default graphql(fetchJokes)(Jokes);
