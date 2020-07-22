import React, { Component } from 'react';
import {
    Text,
    Platform
} from 'react-native';
import HTML from 'react-native-render-html';
import { SelectableText } from '@astrocoders/react-native-selectable-text';
import Clipboard from '@react-native-community/clipboard';
import Tts from 'react-native-tts';

export default class PageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.renderContent()
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.renderContent() !== this.state.content) {
            return this.setState({ content: this.props.renderContent() });
        }
        if (this.props.font != prevProps.font) {
            switch (this.props.font) {
                case 13:
                    return this.setState({ content: this.state.content + " " });
                case 16:
                    return this.setState({ content: this.state.content + "  " });
                case 20:
                    return this.setState({ content: this.state.content + "   " });
                default:
                    return this.setState({ content: this.state.content });
            }
        }

        if (this.props.moon != prevProps.moon) {
            switch (this.props.moon) {
                case 0:
                    return this.setState({ content: this.state.content + " " });
                case 1:
                    return this.setState({ content: this.state.content + "  " });
                case 2:
                    return this.setState({ content: this.state.content + "   " });
                default:
                    return this.setState({ content: this.state.content });
            }
        }
    }

    componentWillUnmount() {
        Tts.stop();
    }

    renderText = (htmlAttribs, children, moon) => {
        return (
            <SelectableText
                menuItems={['Copy', 'Add Note', 'Voice']}
                //onHighlightPress={() => alert('g')}
                style={{
                    textAlign: Platform.OS === "ios" ? 'right' : "left",
                    width: '90%',
                    alignSelf: 'center',
                    color: this.props.color,
                    backgroundColor: this.props.back,
                    fontSize: this.props.font || 50,
                }}
                TextComponent={(value) => (
                    <Text style={{ fontSize: 100, color: 'red' }}>{value}</Text>
                )}
                textValueProp={{ style: { fontSize: 100, color: this.props.color, backgroundColor: this.props.back, } }}
                onSelection={({ eventType, content, selectionStart, selectionEnd }) => {
                    if (eventType === 'Copy') {
                        Clipboard.setString(content);
                    } else if (eventType === 'Add Note') {
                        const str = content.split('').reverse().join('');
                        this.setState({
                            selectedText: str,
                            start: selectionStart,
                            end: selectionEnd,
                        });
                        this.props.onSelectText && this.props.onSelectText({
                            selectedText: str,
                            start: selectionStart,
                            end: selectionEnd,
                        });
                        console.log(str, 'content');
                        this.props.onOpenAddNoteModal();
                    } else if (eventType === 'Voice') {
                        Tts.stop();
                        Tts.getInitStatus().then(() => {
                            Tts.speak(content,
                                Platform.select({
                                    ios: {
                                        //iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
                                        //rate: 0.8,
                                    },
                                    android: {
                                        androidParams: {
                                            //KEY_PARAM_PAN: -1,
                                            //KEY_PARAM_VOLUME: 0.8,
                                            //KEY_PARAM_STREAM: 'STREAM_MUSIC',
                                        },
                                    }
                                })
                            );
                        }, (err) => {
                            if (err.code === 'no_engine') {
                                Tts.requestInstallEngine();
                            }
                        }
                        );

                    }
                }}
                value={<Text style={{ color: this.props.color, fontSize: this.props.font }}>{children}</Text>}
            />
        );
    };


    render() {
        return (
            <HTML
                html={this.state.content}
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
                customWrapper={(content, attr) =>
                    this.renderText(attr, content, this.props.moon)
                }
                baseFontStyle={{
                    fontSize: this.props.font,
                    color: this.props.color,
                }}
                tagsStyles={{
                    i: {
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: this.props.color,
                    },
                }}
                onHTMLParsed={(dom, RNElements) => {
                    // Find the index of the first paragraph
                    const ad = {
                        wrapper: 'Text',
                        tagName: 'span',
                        attribs: {},
                        parent: false,
                        parentTag: false,
                        nodeIndex: 4,
                    };
                    // Insert the component
                    RNElements.splice(4, 0, ad);
                    return RNElements;
                }}
            />
        );
    }
}