import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem
} from 'native-base';
import { Text } from 'react-native'
class CardJoke extends Component {
  render() {
    const { title, content, category } = this.props.navigation.state.params;
    return (
      <Container>
        <Header iosBarStyle="dark-content" androidStatusBarColor="#031828" style={{ backgroundColor: '#031828' }}>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Joke</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: '#e5e7e9' }} padder>
          <Card style={{ backgroundColor: '#ffffff' }}>
            <CardItem header>
              <Text>{title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {content}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>{category}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default CardJoke;