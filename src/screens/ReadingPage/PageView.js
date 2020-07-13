import React, { Component } from 'react';
import {
    Text,
} from 'react-native';
import HTML from 'react-native-render-html';
import { SelectableText } from '@astrocoders/react-native-selectable-text';
import Clipboard from '@react-native-community/clipboard';
import Tts from 'react-native-tts';
import reactotron from 'reactotron-react-native';

export default class PageView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderText = (htmlAttribs, children, moon) => {
        return (
            <SelectableText
                menuItems={['Copy', 'Add Note', 'Voice']}
                //onHighlightPress={() => alert('g')}
                style={{
                    textAlign: 'left',
                    width: '90%',
                    alignSelf: 'center',
                    color: this.props.color,
                    backgroundColor: this.props.back,
                    fontSize: 50,
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
                        console.log(str, 'content');
                        this.props.onOpenAddNoteModal();
                    } else if (eventType === 'Voice') {
                        Tts.speak(content);
                    }
                }}
                value={<Text style={{ color: this.props.color }}>{children}</Text>}
            />
        );
    };


    render() {
        reactotron.log(this.props);
        return (
            <HTML
                html={this.props.renderContent()}
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
                /* baseFontStyle={{
                    fontSize: this.props.font,
                    color: this.props.color,
                }}
                tagsStyles={{
                    i: {
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: this.props.color,
                    },
                }} */
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