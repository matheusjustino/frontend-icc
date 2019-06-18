import React from 'react';
/* eslint-disable */

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-psy="scroll" data-offset="0" className="scrollspy container esquerda mb-5">
                {string(this.props.value)}
            </div>
        );
    }
}

const string = (objs) => {
    if (objs.length > 0) {
        return objs.map((obj) => (
            <p className="my-3 borda" key={obj.id} id={obj.id} >{obj.matricula + ": " + obj.comentario}</p>
        ));
    }
}