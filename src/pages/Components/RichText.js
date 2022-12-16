import React, { Component } from "react";
import RichTextEditor, { stateToHTML } from "react-rte";


class MyStatefulEditor extends Component {
    value = RichTextEditor.createValueFromString(this.props?.updateMemberForm?.text == undefined ? '' : this.props?.updateMemberForm?.text, "html");
    state = {
        // value: RichTextEditor.createEmptyValue()
        value: this.value
    };



    onChange = (value) => {
        this.setState({ value });
        this.props.handleData(
            value.toString("html")
        )
        this.setState({ value });
    };

    render() {
        // const { editorState } = this.props;
        // console.log("this.props:", this.props?.updateMemberForm?.text);
        return (
            <div>
                <RichTextEditor value={this.state.value} onChange={this.onChange} />
            </div>
        );
    }
}

export default MyStatefulEditor;
