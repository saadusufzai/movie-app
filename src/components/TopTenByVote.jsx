import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedMovieData } from '../redux/movieSlice/movieThunk';
import * as d3 from 'd3';
const TopTenByVoteCount = () => {
  const dispatch = useDispatch();
  const svgRef2 = useRef();
  const tooltipRef = useRef();
  const data = useSelector((state) =>
    state.movie.topRatedMovies.results.slice(0, 10)
  );

  useEffect(() => {
    dispatch(fetchTopRatedMovieData());
  }, []);

  // d3  bar graph
  useEffect(() => {
    if (data.length > 0) {
      const colors = d3.scaleOrdinal(d3.schemeCategory10);
      const legendData = Object.keys(data[0]).filter(
        (key) => key === 'vote_average'
      );
      console.log('legendData', legendData);
      const margin = { top: 20, right: 20, bottom: 100, left: 60 },
        w = 900 - margin.left - margin.right,
        h = 500 - margin.top - margin.bottom,
        x = d3.scaleBand().rangeRound([0, w], 0.5),
        y = d3.scaleLinear().range([h, 0]),
        padding = 40;
      //draw axis
      const xAxis = d3
        .axisBottom(x)
        .ticks(10)
        .tickFormat((d, i) => i + 1)
        .tickSizeInner(-h)
        .tickSizeOuter(0)
        .tickPadding(10);
      const yAxis = d3
        .axisLeft(y)
        .ticks(10)

        .tickSizeInner(-w)
        .tickSizeOuter(0)
        .tickPadding(10);

      const svg = d3.select(svgRef2.current);
      svg
        // .attr('viewBox', `-50 -80 900 500`)

        .attr('width', w)
        .attr('height', h)
        .style('background', '#f5f5f5')
        .style('border', '1px solid #ccc')
        .style('margin-top', '20px')
        .style('overflow', 'visible');

      x.domain(
        data.map(function (d, i) {
          return i;
        })
      ).padding(0.5);

      y.domain([
        0,
        d3.max(data, function (d) {
          return d.vote_count;
        }),
      ]);

      // legend
      const legend = svg
        .append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + (padding + 12) + ', 0)');

      legend
        .selectAll('rect')
        .data(legendData)
        .enter()
        .append('rect')
        .attr('x', 400)
        .attr('y', function (d, i) {
          return i * 8;
        })
        .attr('width', 50)
        .attr('height', 15)
        .attr('fill', 'orange');
      legend
        .selectAll('text')
        .data(legendData)
        .enter()
        .append('text')
        .text(function (d) {
          return d;
        })
        .attr('x', 600)
        .attr('y', function (d, i) {
          return i * 18;
        })
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'hanging');

      const tooltip = d3
        .select(tooltipRef.current)
        .append('div')
        .attr('class', 'bar')
        .style('opacity', 0);

      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + h + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'middle')
        .attr('dx', '-0.5em')
        .attr('dy', '-.55em')
        .attr('y', 30)
        .attr('transform', 'rotate(0)');

      svg
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 15)
        .attr('dy', '0.8em')
        .attr('text-anchor', 'end')
        .text('Vote Count');

      svg
        .selectAll('bar')
        .data(data)
        .enter()
        .append('rect')
        .style('fill', 'orange')
        .attr('x', function (d, i) {
          return x(i);
        })
        .attr('width', x.bandwidth())
        .attr('y', function (d) {
          return y(d.vote_count);
        })
        .attr('height', function (d) {
          return h - y(d.vote_count);
        })
        .on('mouseover', (d) => {
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip
            .html(`Movie Name: <span>${d.title}</span>`)
            .style('left', `${d3.event.layerX}px`)
            .style('top', `${d3.event.layerY - 28}px`);
        })
        .on('mouseout', () =>
          tooltip.transition().duration(500).style('opacity', 0)
        );
    }
  }, [data]);

  return (
    <div className='stats'>
      <h1>Top 10 Movies by vote count</h1>
      <div id='voteCount'></div>
      <svg ref={svgRef2}></svg>
      <div ref={tooltipRef} className='tooltip'></div>
    </div>
  );
};

export default TopTenByVoteCount;
