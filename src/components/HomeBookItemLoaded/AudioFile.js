import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, TextInput, FlatList, Alert, Slider } from 'react-native';
import styles from './styles';
import Content from '../../components/Containers/Content';
import Container from '../../components/Containers/Container';
import { svg_photo } from "../../assets/svg/svg";
import Sound from "react-native-sound";
import { SvgUri } from "react-native-svg";
import reactotron from 'reactotron-react-native';
import SeekBar from './SeekBar';
import { audio_progess } from '../../services/books'

let url = ''
export default class AudioFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            audio: false,
            index: null,

            isAudio: false,
            status: 0, //0: stoped, 1: play , 2: paused

            totalLength: 0,
            currentPosition: 0,

            progress: 0,
        };

        Sound.setCategory('Playback');

        this.intervalPlayer = undefined;
        this.Player = undefined;
    }

    onPressAudio = (url) => {
        if (this.Player !== undefined) {
            this.Player.reset().release();
            this.Player = undefined;
        }
        this.setState({ status: 0, isAudio: false });
        this.Player = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                reactotron.log('failed to load the sound', error);
                this.setState({ isAudio: false });
                Alert.alert("خطأ!", "حدث خطأ أثناء تشغيل المقطع الصوتي!")
                return;
            }
            this.setState({ isAudio: true, totalLength: this.Player.getDuration() });
            reactotron.log('duration in seconds: ' + this.Player.getDuration() + 'number of channels: ' + this.Player.getNumberOfChannels());
        });
    }

    onPlayAudio = () => {
        if (this.Player !== undefined) {
            this.setState({ status: 1 });
            this.intervalPlayer = setInterval(() => {
                this.Player !== undefined && this.Player.getCurrentTime((seconds) => {
                    //reactotron.log((seconds * 100) / (this.state?.totalLength));
                    this.setState({ currentPosition: seconds, progress: ((seconds * 100) / (this.state?.totalLength)) });
                });
            }, 100);
            this.Player.play((success) => {
                if (success) {
                    this.onResetAudio();
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }
    }

    onPauseAudio = () => {
        if (this.Player !== undefined) {
            this.Player.pause(() => {
                audio_progess(this.props.bookId, this.props.audio_books?.[this.state.index]?.id, Math.round(this.state.progress))
                this.setState({ status: 2 }, () => {
                    this.intervalPlayer && clearInterval(this.intervalPlayer);
                    this.intervalPlayer = undefined;
                });
            });
        }
    }

    onStopAudio = () => {
        if (this.Player !== undefined) {
            this.Player.stop(() => {
                audio_progess(this.props.bookId, this.props.audio_books?.[this.state.index]?.id, Math.round(this.state.progress))
                this.setState({ status: 0 }, () => {
                    this.intervalPlayer && clearInterval(this.intervalPlayer);
                    this.intervalPlayer = undefined;
                });
            });
        }
    }

    onResetAudio = () => {
        if (this.Player !== undefined) {
            audio_progess(this.props.bookId, this.props.audio_books?.[this.state.index]?.id, Math.round(this.state.progress))
            this.Player.reset().release();
            this.setState({ status: 0, isAudio: false, progress: 0 });
            this.Player = undefined;

            this.intervalPlayer && clearInterval(this.intervalPlayer);
            this.intervalPlayer = undefined;
        }
    }


    setDuration(data) {
        this.setState({ totalLength: Math.floor(data.duration) });
    }

    setTime(data) {
        this.setState({ currentPosition: Math.floor(data.currentTime) });
    }

    seek(time) {
        time = Math.round(time);
        if (this.Player !== undefined) {
            this.Player.setCurrentTime(time);
            this.setState({
                currentPosition: time,
            });
        }
    }


    componentWillUnmount() {
        this.onResetAudio();
    }

    render() {

        return (

            <Modal
                propagateSwipe={true}
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.onResetAudio()
                    /* this.whoosh.stop(() => {
                    }); */
                    this.props.onRequestClose()
                }}>
                <Container>
                    <Content style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                        <View style={styles.modalContainer}>
                            {/*<Image style={styles.modal_img1}*/}
                            {/*source={require('../../assets/images/walkthrough_image.png')}/>*/}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginBottom: 5 }}>
                                <Text style={styles.modal_text}>ملفات الصوت لهذا الكتاب :</Text>
                                <TouchableOpacity onPress={() => {
                                    this.onResetAudio();
                                    /* this.whoosh.stop(() => {
                                    }); */
                                    this.props.onRequestClose()
                                }}>
                                    <SvgUri width={15} height={15} uri={svg_photo.close} />
                                </TouchableOpacity>
                            </View>
                            <FlatList data={this.props.audio_books}
                                renderItem={(item) => {
                                    return (
                                        <View style={{ paddingVertical: 10, marginVertical: 5, marginHorizontal: 10, borderRadius: 5, borderColor: "#dfdfdf", borderWidth: 1 }}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({ audio: true, index: item.index, url: item.item.url }, () => {
                                                    this.onPressAudio(this.state.url);
                                                });
                                            }}
                                                style={styles.files}>
                                                <Text>{item.item.type}{item.index}</Text>

                                                {item.index == this.state.index && this.state.isAudio &&
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        width: 100,
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        {this.state.status != 1 && <TouchableOpacity
                                                            onPress={() => {
                                                                //console.log(item.item.url)
                                                                this.onPlayAudio();
                                                            }}
                                                            style={styles.headerItem}>
                                                            <Image style={{ width: 30, height: 30 }} resizeMethod="resize" resizeMode="contain" source={require('../../assets/images/play.png')} />
                                                        </TouchableOpacity>}
                                                        {this.state.status != 0 && this.state.status != 2 && <TouchableOpacity
                                                            onPress={() => {
                                                                this.onPauseAudio();
                                                            }}
                                                            style={styles.headerItem}>
                                                            <Image style={{ width: 30, height: 30 }} resizeMethod="resize" resizeMode="contain" source={require('../../assets/images/pause.png')} />
                                                        </TouchableOpacity>}
                                                        {this.state.status != 0 && <TouchableOpacity
                                                            onPress={() => {
                                                                this.onStopAudio();
                                                            }}
                                                            style={styles.headerItem}>
                                                            <Image style={{ width: 30, height: 30 }} resizeMethod="resize" resizeMode="contain" source={require('../../assets/images/stop.png')} />
                                                        </TouchableOpacity>}
                                                    </View>}
                                            </TouchableOpacity>


                                            {item.index == this.state.index && this.state.isAudio && this.state.status == 1 &&
                                                <SeekBar
                                                    onSeek={this.seek.bind(this)}
                                                    trackLength={this.state.totalLength}
                                                    onSlidingStart={() => this.onPauseAudio()}
                                                    currentPosition={this.state.currentPosition}
                                                />
                                            }
                                        </View>
                                    )
                                }} />

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
