import React from 'react';

class FlashMessage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            timeout: null,
            containerStyle: style.container,
            contentStyle: style.content,
        }
    }

    close(flashTime) {
        clearTimeout(this.state.timeout);

        return setTimeout(_ => {
            this.setState({ containerStyle: style.container });
        }, flashTime)
    }

    flash({ message, type = "success", flashTime = 3000 }) {
        if (!message || message === this.state.message) return;
        
        const containerStyle = Object.assign({}, this.state.containerStyle, {
            top: "20px"
        });

        const contentStyle = Object.assign({}, this.state.contentStyle, {
            backgroundColor: type === "success" ? "green" : "red",
        });

        this.setState({ contentStyle, containerStyle, message, timeout: this.close(flashTime) })
    }

    render() {
        const { containerStyle, contentStyle } = this.state;
        const { flashOptions = {} } = this.props;
        this.flash(flashOptions);

        return <div style = {containerStyle} >
            <div style={contentStyle} >
                {flashOptions.message}
            </div>
        </div>
    }
    
}

export default FlashMessage;

const style = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "45px",
        position: "absolute",
        top: "-250px",
        transition: "all 0.5s ease"
    },
    content: {
        height: "100%",
        textAlign: "center",
        minWidth: "320px",
        padding: "0 40px",
        lineHeight: "1.5"
    }
}