import React, { Component } from 'react';

class SVGRenderer extends Component {
  static defaultProps = {
    onMouseOver() { }
  };

  getObjectComponent(type) {
    let { objectTypes } = this.props;
    return objectTypes[type];
  }

  renderObject(object, index) {
    let { objectRefs, onMouseOver } = this.props;
    let Renderer = this.getObjectComponent(object.type);
    return (
      <Renderer onRender={(ref) => objectRefs[index] = ref}
        onMouseOver={onMouseOver.bind(this, index)}
        object={object} key={index} index={index} />
    );
  }

  render() {
    let { background, objects, svgStyle, canvas,
      onMouseDown, onRender } = this.props;
    let { width, height, canvasOffsetX, canvasOffsetY } = canvas;


    let style = {
      ...styles.canvas,
      ...background ? {
        backgroundImage: background
      } : styles.grid,
      ...{
        ...svgStyle,
        marginTop: canvasOffsetY,
        marginLeft: canvasOffsetX
      }
    };
    // console.log("style", style)

    return (
      <svg onMouseDown={onMouseDown}
        ref={onRender}
        width={width}
        height={height}
        style={style}
        isRoot={true}
      >
        {objects.map(this.renderObject.bind(this))}
      </svg>
    );
  }
}

export const styles = {
  canvas: {
    backgroundSize: "cover"
  },
  grid: {
    backgroundSize: "auto"
  }
};

export default SVGRenderer;
