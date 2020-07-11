import React, {Component} from 'react';
import {Modal, View, Text, TouchableOpacity, Image, TextInput, FlatList, Alert} from 'react-native';
import styles from './styles';
import Content from '../../components/Containers/Content';
import Container from '../../components/Containers/Container';
import {svg_photo} from "../../assets/svg/svg";
import Sound from "react-native-sound";
import {SvgUri} from "react-native-svg";


let url = ''
export default class AudioFile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            url: '',
            audio: false,
            index: 2554545415
        };
        this.whoosh = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
            // Play the sound with an onEnd callback
            this.whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                    alert('Notice', 'audio file error. (Error code : 2)');

                }
            });
        });
    }

    render() {

        return (

            <Modal
                propagateSwipe={true}
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <Container>
                    <Content style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                        <View style={styles.modalContainer}>
                            {/*<Image style={styles.modal_img1}*/}
                            {/*source={require('../../assets/images/walkthrough_image.png')}/>*/}
                            <Text style={styles.modal_text}>ملفات الصوت لهذا الكتاب :</Text>
                            <FlatList data={this.props.audio_books}
                                      renderItem={(item) => {
                                          console.log('item', item)
                                          return <TouchableOpacity onPress={() => {
                                              url = item.item.url
                                              this.setState({audio: true, index: item.index})
                                          }} style={styles.files}>
                                              <Text>{item.item.type}{item.index}</Text>
                                              {item.index == this.state.index && <View style={{
                                                  flexDirection: 'row',
                                                  width: 100,
                                                  justifyContent: 'space-between'
                                              }}>
                                                  <TouchableOpacity
                                                      onPress={() => {
                                                          console.log(item.item.url)
                                                          Sound.setCategory('Playback');

                                                          this.whoosh.play(success => {
                                                              if (success) {
                                                                  console.log('successfully finished playing');
                                                              } else {
                                                                  console.log('playback failed due to audio decoding errors');
                                                                  this.whoosh = new Sound(item.item.url)
                                                                  this.whoosh.play()
                                                              }
                                                          })
                                                      }}
                                                      style={styles.headerItem}>
                                                      <SvgUri width={15} height={15} uri={svg_photo.read_paly}/>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity
                                                      onPress={() => {

                                                          this.whoosh.pause(() => {
                                                              //  alert('pause')
                                                          });

                                                      }}
                                                      style={styles.headerItem}>
                                                      <SvgUri width={15} height={15} uri={svg_photo.pause}/>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity
                                                      onPress={() => {

                                                          this.whoosh.stop(() => {
                                                          });
                                                      }}
                                                      style={styles.headerItem}>
                                                      <SvgUri width={15} height={15} uri={svg_photo.pause}/>
                                                  </TouchableOpacity>
                                              </View>}
                                          </TouchableOpacity>
                                      }}/>

                        </View>
                    </Content>
                </Container>
            </Modal>
        );
    }

    renderItem(item) {
        return (
            <TouchableOpacity style={styles.modal_view}>
                {/*<Image style={styles.modal_img} source={require('../../assets/images/walkthrough_image.png')}/>*/}
                <Text style={styles.modal_text}>{item['name']}</Text>
            </TouchableOpacity>
        );
    }

}
