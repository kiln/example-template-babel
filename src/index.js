// This template uses d3-selection and d3-transition
// Importing d3-transition adds the .transition() method to selections
import { select } from "d3-selection";
import "d3-transition";

// Anything the end user can configure in the settings panel must be in
// this object. The settings in template.yml reference these property names.
export let state = {
	radius: 10,
	stroke: 1,
	color: "#FF0000"
};

let circle;

// Initialise the graphic
export const draw = () => {
	// Append and style elements based on the current state
	let w = window.innerWidth,
	    h = window.innerHeight;

  let svg = select(document.body).append("svg").attr("width", w).attr("height", h);
	circle = svg.append("circle")
		.attr("cx", w/2)
		.attr("cy", h/2)
		.attr("r", state.radius)
		.attr("fill", state.color)
		.attr("stroke", "black")
		.attr("stroke-width", state.stroke);
};

// For non-fluid visualisations, e.g. where an SVG is drawn to fill the available space,
// it may be useful to redraw the visualisation when the window size changes.
window.addEventListener("resize", () => {
	if (!circle) return; // Do nothing if draw() hasn’t been called yet
	select("svg").remove();
	draw();
});

// The update function is called when the user changes a state property in
// the settings panel or presentation editor. It updates elements to reflect
// the current state.
export const update = () => {
	if (state.radius <= 0) throw new Error("Radius must be positive");
	circle.transition()
		.attr("r", state.radius)
		.attr("fill", state.color)
		.attr("stroke-width", state.stroke);
};
