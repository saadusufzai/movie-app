import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedMovieData } from '../redux/movieSlice/movieThunk';
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  pointer,
  json,
  event,
} from 'd3';
import d3Tip from 'd3-tip';
const TopTenChart = () => {
  const dispatch = useDispatch();
  const svgRef = useRef();
  const tooltipRef = useRef();
  const topRatedMovies = useSelector((state) =>
    state.movie.topRatedMovies.results.slice(0, 10)
  );
  const data = {
    ratings: topRatedMovies.map((movie) => movie.vote_average),
    name: topRatedMovies.map((movie) => movie.title),
  };

  console.log('ratings', data);
  useEffect(() => {
    dispatch(fetchTopRatedMovieData());
  }, []);

  // d3  bar graph
  useEffect(() => {
    const w = 700;
    const h = 500;

    const svg = select(svgRef.current);
    svg
      .attr('width', w)
      .attr('height', h)
      .style('background', '#f5f5f5')
      .style('border', '1px solid #ccc')
      .style('margin-top', '20px')
      .style('overflow', 'visible');

    const xScale = scaleBand()
      .domain(
        data.ratings.map((value, index) => {
          console.log('VALUEs', value);
          return index;
        })
      )
      .range([0, w])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 10]).range([h, 0]);

    const colorScale = scaleLinear()
      .domain([1, 5, 10])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    // X-axis ticks
    const xAxis = axisBottom(xScale)
      .ticks(data.ratings.length)
      .tickFormat((value) => value + 1);
    svg.append('g').attr('transform', `translate(0, ${h})`).call(xAxis);

    // Y-axis ticks
    const yAxis = axisRight(yScale)
      .ticks(data.ratings.length)
      .tickFormat((value, index) => index);
    svg.append('g').attr('transform', `translate(${w}, 0)`).call(yAxis);

    // tooltip
    const tooltip = select(tooltipRef.current)
      .append('div')
      .attr('class', 'bar')
      .style('opacity', 0);

    let bar = svg
      .selectAll('.bar')
      .data(data.ratings)
      .join('rect')
      .attr('class', 'bar')

      .attr('x', (value, index) => xScale(index))
      .attr('y', yScale)
      .attr('width', xScale.bandwidth());

    bar
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('dy', '0.8em')
      .attr('text-anchor', 'end')
      .text('Vote Count');

    bar
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => h - yScale(value));
    bar
      .on('mouseover', (d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`Ratings: <span>${d}</span>`)
          .style('left', `${event.layerX}px`)
          .style('top', `${event.layerY - 28}px`);
      })
      .on('mouseout', () =>
        tooltip.transition().duration(500).style('opacity', 0)
      );
  }, [data.ratings]);

  return (
    <div className='stats'>
      <h1>Top 10 Movies by rating</h1>
      <div ref={tooltipRef}></div>
      <svg ref={svgRef}></svg>
      <span>top movies 1 - 10 </span>
    </div>
  );
};

export default TopTenChart;
