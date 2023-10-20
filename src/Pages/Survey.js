import React from "react";

class Survey extends React.Component {
    componentDidMount() {
        let el = document.createElement("script");
        el.src =
            "https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgdyxhAYEFrfnfhu7TDYcP6plXigZOKWXkcgJELTDRwEtD.js";
        document.body.appendChild(el);
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div id="smcx-sdk"></div>
            </div>
        );
    }
}
export default Survey;
