import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
  Textarea,
  // Text,
  Picker
} from 'native-base';
import { KeyboardAvoidingView, Text } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const defaultState = {
  values: {
    title: '',
    joke: '',
    category: '',
  },
  errors: {},
  isSubmitting: false,
}
class AddJoke extends Component {
  state = defaultState;

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  onValueChange = (category) => {
    this.setState({
      category: category
    })
  }

  submit = async () => {
    const { title, joke, category } = this.state.values
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: {
          title,
          joke,
          category,
        },
      });
    } catch (err) {
      this.setState({
        errors: {
          title: 'The joke is already in',
        },
        isSubmitting: false,
      });
      return;
    }
 
    // await AsyncStorage.setItem('@GRAPHQL_PRISMA/token', response.data.signup.token);
    // this.setState(defaultState);
    // this.props.navigation.navigate('Login');
  

  };

  render() {
    // const { errors, values: { title, joke } } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding">
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
            <Title>Add Joke</Title>
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
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                // onChangeText={text => this.onChangeText('title', text)}
              // value={title}
              />
            </Item>
            <Textarea rowSpan={5} bordered placeholder="Textarea"
              // onChangeText={text => this.onChangeText('joke', text)}
            // value={joke}
            />
            {/* <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              // headerStyle={{ backgroundColor: "#b95dd3" }}
              // headerBackButtonTextStyle={{ color: "#fff" }}
              // headerTitleStyle={{ color: "#fff" }}
              style={{ width: undefined }}
              selectedValue={this.state.category}
              onValueChange={this.onValueChange('category')}
            >
              <Picker.Item label="Men/Women" value="key0" />
              <Picker.Item label="Pick-up lines" value="key1" />
              <Picker.Item label="Lookin good" value="key2" />
              <Picker.Item label="Miscellaneous" value="key3" />
              <Picker.Item label="Technology" value="key4" />
            </Picker> */}
          </Form>
          <Button
            block
            onPress={this.submit}
            style={{ backgroundColor: '#1c2f3d' }}
          >
            <Text>ADD</Text>
          </Button>
        </Content>
      </Container>
      </KeyboardAvoidingView>
    );
  }
}

const createJoke = gql`
  mutation($title: String!, $joke: String!){
  createJoke(title:$title, content: $joke){
    title
    content
  }
}
`;
export default graphql(createJoke)(AddJoke);