import React from 'react';
import Button from "@material-ui/core/Button";

export default class ProfilePhotoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: {},
            error: true,
            textError: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateFilePresence = this.validateFilePresence.bind(this);
    }

    handleChange(e) {
        this.removeValidation();
        let file = e.target.files[0];
        if (this.validateSize(file) && this.validateExt(file)) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };
                this.props.onDone(fileInfo);
            }
        }
    }

    removeValidation() {
        this.setState({error: false, textError: "", file: {}})
    };

    validateSize(file) {
        if (file && file.size > 1000 * 1024) {
            this.setState({error: true, textError: "File size is more than 1 mB", file: {}});
            return false;
        } else {
            return true;
        }
    };

    validateExt(file) {
        const ext = file.type.toLowerCase();
        if (file && ext !== 'image/jpg' && ext !== 'image/jpeg' && ext !== 'image/png'
            && ext !== 'image/gif' && ext !== 'image/bmp' && ext !== 'image/svg') {
            this.setState({error: true, textError: "Wrong image extension", file: {}});
            return false;
        } else {
            return true;
        }
    };

    validateFilePresence() {
        this.setState({error: true, textError: "Choose file", file: {}});
    }

    render() {
        return (
            <div>
                <input
                    type="file"
                    onChange={this.handleChange}
                    multiple={this.props.multiple}
                    size="100"
                    accept="image/*"/>
                <br/>
                {this.state.error ? <div className="error-message">{this.state.textError}</div> : ""}
                <div className="btn-row">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.state.error ? this.validateFilePresence : this.props.onSubmit}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="contained"
                        color='secondary'
                        onClick={this.props.onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }
}

ProfilePhotoForm.defaultProps = {
    multiple: false,
};
