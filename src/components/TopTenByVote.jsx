import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedMovieData } from '../redux/movieSlice/movieThunk';
import * as d3 from 'd3';
const TopTenByVoteCount = () => {
	const dispatch = useDispatch();
	const svgRef2 = useRef();
	const data = useSelector((state) =>
		state.movie.topRatedMovies.results.slice(0, 10)
	);

	useEffect(() => {
		dispatch(fetchTopRatedMovieData());
	}, []);

	// d3  bar graph
	useEffect(() => {
		if (data.length > 0) {
			const margin = { top: 20, right: 20, bottom: 100, left: 60 },
				w = 900 - margin.left - margin.right,
				h = 500 - margin.top - margin.bottom,
				x = d3.scaleBand().rangeRound([0, w], 0.5),
				y = d3.scaleLinear().range([h, 0]);

			//draw axis
			const xAxis = d3.axisBottom(x);
			const yAxis = d3
				.axisLeft(y)
				.ticks(5)
				.tickSizeInner(-w)
				.tickSizeOuter(0)
				.tickPadding(10);

			const svg = d3.select(svgRef2.current);
			svg
				.attr('width', w)
				.attr('height', h)
				.style('background', '#f5f5f5')
				.style('border', '1px solid #ccc')
				.style('margin-top', '20px')
				.style('overflow', 'visible');

			x.domain(
				data.map(function (d) {
					return d.vote_average;
				})
			).padding(0.5);

			y.domain([
				0,
				d3.max(data, function (d) {
					return d.vote_count;
				}),
			]);
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
				.attr('y', 5)
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
					return x(d.vote_average);
				})
				.attr('width', x.bandwidth())
				.attr('y', function (d) {
					return y(d.vote_count);
				})
				.attr('height', function (d) {
					return h - y(d.vote_count);
				});
		}
	}, [data]);

	return (
		<div className='stats'>
			<h1>Top 10 Movies by vote count</h1>
			<div id='voteCount'></div>
			<svg ref={svgRef2}></svg>
		</div>
	);
};

export default TopTenByVoteCount;
