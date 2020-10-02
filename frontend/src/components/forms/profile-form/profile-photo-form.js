import React from 'react';
import Button from "@material-ui/core/Button";
import {ErrorMsg} from "../../parts/layout/error-message";

export default class ProfilePhotoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let file = e.target.files[0];
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

    render() {
        return (
            <div>
                <input
                    type="file"
                    onChange={this.handleChange}
                    multiple={this.props.multiple}
                    size="1000"
                    accept="image/*"/>
                <br/>
                <div className="btn-row">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.props.onSubmit}
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

//todo валидацию

// //проверка размера файла
// function validateSize(file) {
//     if (file.files[0].size > 1000 * 1024) {
//         const error = generateError('Размер файла превышает 1 мБ');
//         file.parentElement.insertBefore(error, file);
//     }
// }
//
// //проверка размера файла
// function validateExt(file) {
//     const ext = file.files[0].type.toLowerCase();
//     if (ext !== 'image/jpg' && ext !== 'image/jpeg' && ext !== 'image/png'
//         && ext !== 'image/gif' && ext !== 'image/bmp' && ext !== 'image/svg') {
//         const error = generateError('Изображение имеет неправильное расширение');
//         file.parentElement.insertBefore(error, file);
//     }
// }
//
// //генерация ошибок
// let generateError = function (text) {
//     return <ErrorMsg/>;
// }