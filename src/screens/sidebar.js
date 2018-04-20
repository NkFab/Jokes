import React, { Component } from "react";
import { Image, Text } from "react-native";
import {
  Content,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import sidebarstyles from "./styles/sidebarstyles";

const drawerCover = require("../images/cover.jpg");
// const drawerImage = require("../images/funny-or-die-logo.png");
const datas = [
  {
    name: "Jokes",
    route: "D1",
    // icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Add joke",
    route: "D2",
    // icon: "easel",
    bg: "#C5F442"
  },
  // {
  //   name: "Header",
  //   route: "Header",
  //   icon: "phone-portrait",
  //   bg: "#477EEA",
  //   types: "10"
  // },
  // {
  //   name: "D3",
  //   route: "D3",
  //   // icon: "phone-portrait",
  //   bg: "#DA4437",
  //   // types: "4"
  // },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#eeeeee", top: -1 }}
        >
          <Image source={drawerCover} style={sidebarstyles.drawerCover} />
          {/* <Image square style={sidebarstyles.drawerImage} source={drawerImage} /> */}

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={sidebarstyles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={sidebarstyles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
