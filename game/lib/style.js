var style;
(function () {
    var defaultColor = "white";
    var highlightColor = "#FEFFD5";
    
    style = {
        navitem: {
            base: {
                font: '30pt Sugarpunch',
                align: 'left',
                strokeThickness: 4
            },
            default: {
                fill:defaultColor,
                stroke: 'rgba(0,0,0,0)'
            },
            hover: {
                fill: highlightColor,
                stroke: 'rgba(200, 200, 200, 0.5)'
            }
        }
    };
    
    Object.assign(style.navitem.hover, style.navitem.base);
    Object.assign(style.navitem.default, style.navitem.base);
}) ();