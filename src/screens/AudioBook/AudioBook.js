import React from 'react';
import {
    View,
    Text,
    Alert,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Content from "../../components/Containers/Content";
import Container from "../../components/Containers/Container";
import Button from "../../components/Button/Button";
import Sound from 'react-native-sound';
import styles from "../ReadingPage/styles";
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import {success} from "../../stores/saga/models/user-store/actions";


export default class AudioBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           url : 'http://95.111.251.63:8000/media/books/1/audio/WhatsApp_Audio_2020-07-05_at_12.36.22_PM.mp4'
        };
        const audioRecorderPlayer = new AudioRecorderPlayer();
        this.whoosh = new Sound(this.state.url, Sound.MAIN_BUNDLE);
    }

   async componentDidMount(){
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the storage');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }


    onStartRecord = async () => {
        const result = await this.audioRecorderPlayer.startRecorder('http://95.111.251.63:8000/media/books/1/audio/WhatsApp_Audio_2020-07-05_at_12.36.22_PM.mp4');
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
            return;
        });
        console.log(result);
    }
    onStartRecord = async () => {
        const result = await this.audioRecorderPlayer.startRecorder();
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
            return;
        });
        console.log(result);
    };

    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
        });
        console.log(result);
    };

    async onStartPlay(){
        console.log('onStartPlay');
        var url='http://95.111.251.63:8000/media/books/1/audio/WhatsApp_Audio_2020-07-05_at_12.36.22_PM.mp4';
        // Load the sound file 'whoosh.mp3' from the app bundle
        // See notes below about preloading sounds within initialization code below.
        var whoosh = new Sound(this.state.url, Sound.MAIN_BUNDLE, (error) => {
            if(!this.state.play){
                whoosh.release()
                this.setState({play: false})
                url=null
            }else {
                alert(this.state.play)
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
                // Play the sound with an onEnd callback
                whoosh.play((success) => {
                    if (success) {
                        this.setState({play: true})
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }
        });
        // Pause the sound
        // Stop the sound and rewind to the beginning
        // Release the audio player resource
        whoosh.release();
        // AudioPlayer.onEnd(() => {
        //     console.log('on end');
        // });
        //
        // var url ='http://95.111.251.63:8000/media/books/1/audio/WhatsApp_Audio_2020-07-05_at_12.36.22_PM.mp4';
        // AudioPlayer.prepare(url, () => {
        //     AudioPlayer.play();
        //
        //     AudioPlayer.getDuration((duration) => {
        //         console.log(duration);
        //     });
        //     setInterval(() => {
        //         AudioPlayer.getCurrentTime((currentTime) => {
        //             console.log(currentTime);
        //         });
        //     }, 1000);
        //     AudioPlayer.stop();
        //     AudioPlayer.pause();
        //    // AudioPlayer.setCurrentTime(50.5);
        // })
    };

    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
    };

    onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
    };

    render() {
        return(
      <Container>
          <Content>

              <View style={{
                  flexDirection:'row',
                  width:170,
                  justifyContent:'space-between'
              }}>
              <TouchableOpacity
                  onPress={() => {
                      this.setState({play: !this.state.play})
                      Sound.setCategory('Playback');
                      this.whoosh.play(success=>{
                          alert('success')
                      })
                      // this.whoosh = new Sound(this.state.url, Sound.MAIN_BUNDLE, (error) => {
                      //     if (!this.state.play) {
                      //         this.whoosh.release()
                      //         this.setState({play: false})
                      //         this.url = null
                      //     } else {
                      //        // alert(this.state.play)
                      //         if (error) {
                      //             console.log('failed to load the sound', error);
                      //             return;
                      //         }
                      //
                      //         this.whoosh.play((success) => {
                      //             if (success) {
                      //                 this.setState({play: true})
                      //                 console.log('successfully finished playing');
                      //             } else {
                      //                 console.log('playback failed due to audio decoding errors');
                      //             }
                      //         });
                      //     }
                      // });

                      //this.whoosh.release();
                  }}
                  style={styles.headerItem}>
                  <SvgUri uri={svg_photo.read_paly}/>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={() => {

                      this.whoosh.pause(()=>{
                          alert('pause')
                      });
                      // this.whoosh.stop(() => {
                      // });
                  }}
                  style={styles.headerItem}>
                  <SvgUri uri={svg_photo.pause}/>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => {

                      // this.whoosh.pause(()=>{
                      //     alert('pause')
                      // });
                      this.whoosh.stop(() => {
                      });
                  }}
                  style={styles.headerItem}>
                  <SvgUri uri={svg_photo.pause}/>
              </TouchableOpacity>
              </View>
          </Content>
      </Container>
        )
    }
}
