import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, Text, TouchableOpacity, View, TextInput, ScrollView, Dimensions} from "react-native";
import styles from './styles'
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import {colors} from "../../config/styles";
import Swipeout from 'react-native-swipeout';
import storage from "../../config/storage";
import HTML from 'react-native-render-html';
import {SelectableText} from "@astrocoders/react-native-selectable-text";
import Tts from 'react-native-tts';
import AudioBooks from "../AudioBooks/AudioBooks";

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

export default class ReadingPage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            moon: 0,
            moon_icon: svg_photo.read_moon,
            back: colors.white,
            menu: false,
            search: false,
        }
    }

    async componentDidMount() {
        this.setState({moon: 0, moon_icon: svg_photo.read_moon, back: colors.white})
        await storage.setItem('moon', 0)
    }

    renderText = (htmlAttribs, children) => {
        console.log('htm', htmlAttribs)
        return (
            <SelectableText menuItems={["Copy", "Add Note", "Voice"]}
                //style={{ fontSize: 20,color:'red' }}
                            onHighlightPress={() => alert('g')}
                            onSelection={({eventType, content, selectionStart, selectionEnd}) => {
                                if (eventType == 'Copy') {
                                    Clipboard.setString(children)
                                } else if (eventType == "Add Note") {
                                    this.props.navigation.navigate('Login')
                                }else if (eventType == "Voice") {
                                    Tts.speak(content);

                                }
                            }}
                            value={children}/>
        )
    }

    render() {
        return (

            <Container style={{backgroundColor: this.state.back}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}
                                      style={styles.headerItem}>
                        <SvgUri uri={svg_photo.arrow_back}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({search: !this.state.search})}
                                      style={[styles.headerItem, {
                                          backgroundColor: this.state.search ? '#FFCA2E' : 'transparent',
                                          borderColor: this.state.search ? '#FFCA2E' : colors.grey2
                                      }]}>
                        <SvgUri uri={!this.state.search ? svg_photo.not_active_search : svg_photo.white_search}/>
                    </TouchableOpacity>
                    <View style={styles.headerItem}>
                        <SvgUri uri={svg_photo.shape} style={{marginTop: '80%'}}/>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({menu: !this.state.menu})}
                                      style={[styles.headerItem, {
                                          backgroundColor: this.state.menu ? '#FFCA2E' : 'transparent',
                                          borderColor: this.state.menu ? '#FFCA2E' : colors.grey2
                                      }]}>
                        <SvgUri uri={this.state.menu==true ? svg_photo.white_menu : svg_photo.read_menu}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        this.props.navigation.openDrawer()

                    }} style={styles.headerItem}>
                        <SvgUri uri={svg_photo.menu}/>
                    </TouchableOpacity>
                </View>
                <Content>

                    {this.state.menu ?
                        <View>
                            <FlatList data={[{}, {}, {}, {}, {}]}
                                      style={{}}
                                      renderItem={(item) => <Swipeout style={styles.swipe}
                                                                      right={[{
                                                                          component: (
                                                                              <TouchableOpacity onPress={()=>{}}
                                                                                                style={styles.edit1}>
                                                                                  <View style={styles.edit}>
                                                                                      <SvgUri uri={svg_photo.trash}/>
                                                                                  </View>
                                                                              </TouchableOpacity>

                                                                          ),
                                                                      }]}
                                      >
                                          <View style={styles.diff_view}>
                                          <Text
                                              style={[styles.address_text, {color: this.state.moon == 2 ? colors.white : colors.primary,textAlign:'left',}]}>وجه
                                              الإختلاف
                                              بين</Text>
                                          <Text style={[styles.address_text, {
                                              fontSize: 13,textAlign:'left',
                                              color: this.state.moon == 2 ? colors.grey2 : colors.grey3,
                                          }]}>هنالك العديد من الأنواع
                                              المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال
                                              بعض
                                              النوادر أو الكلمات</Text>
                                          {/*<Text style={[styles.address_text,{color:colors.primary}]}>كتاب: تاريح الخلفاء</Text>*/}
                                      </View>
                                      </Swipeout>}/>

                        </View> :
                        <ScrollView style={{flex: 1}}>

                            <HTML html={htmlContent}
                                  renderers={{
                                      span: this.renderText.bind(this),
                                      h1: this.renderText.bind(this),
                                      h2: this.renderText.bind(this),
                                      h3: this.renderText.bind(this),
                                      h4: this.renderText.bind(this),
                                      h5: this.renderText.bind(this),
                                      h6: this.renderText.bind(this),
                                      p: this.renderText.bind(this),
                                      em: this.renderText.bind(this),
                                  }}
                                  textSelectable={true}
                                  onHTMLParsed={(dom, RNElements) => {
                                      // Find the index of the first paragraph
                                      const ad = {
                                          wrapper: 'View',
                                          tagName: 'mycustomblock',
                                          attribs: {},
                                          parent: false,
                                          parentTag: false,
                                          nodeIndex: 4
                                      };
                                      // Insert the component
                                      RNElements.splice(4, 0, ad);
                                      return RNElements;
                                  }}

                            />
                        </ScrollView>
                    }
                </Content>
                {!this.state.menu && < View style={styles.item1}>
                    <Text style={styles.item1_text}>11</Text>
                    <Text style={styles.item2_text}>11/890 صفحة</Text>
                </View>
                }
                {this.state.search && <View style={styles.search_bar}>
                    <TextInput placeholder={'بحث عن كتاب'}
                               style={styles.input}/>
                    <SvgUri uri={svg_photo.not_active_search}/>
                </View>
                }
                <View style={styles.footer}>
                    <View style={styles.headerItem}>
                        <SvgUri uri={svg_photo.read_back}/>
                    </View>
                    <TouchableOpacity onPress={async () => {
                        switch (this.state.moon) {
                            case 0:
                                this.setState({moon: 1, moon_icon: svg_photo.read_moon, back: colors.white})
                                await storage.setItem('moon', 1)
                                break;

                            case 1:
                                this.setState({moon: 2, moon_icon: svg_photo.read_moon, back: colors.black})
                                await storage.setItem('moon', 2)
                                break;

                            case 2:
                                this.setState({moon: 0, moon_icon: svg_photo.sun, back: '#FFF4E6'})
                                await storage.setItem('moon', 0)
                                break;
                        }
                    }} style={[styles.headerItem, {
                        backgroundColor: this.state.moon == 2 ? '#FFCA2E' : 'transparent',
                        borderColor: this.state.moon == 2 ? '#FFCA2E' : colors.grey2
                    }]}>
                        <SvgUri uri={this.state.moon_icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('AudioBooks')} style={styles.headerItem}>
                        <SvgUri uri={svg_photo.read_paly}/>
                    </TouchableOpacity>
                    <View style={styles.headerItem}>
                        <SvgUri uri={svg_photo.format}/>
                    </View>
                    <View style={styles.headerItem}>
                        <SvgUri uri={svg_photo.read_forward}/>
                    </View>
                </View>
            </Container>

        )
    }
}
