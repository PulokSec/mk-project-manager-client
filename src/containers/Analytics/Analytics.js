import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const Analytics = () => {
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
	const openProject = useSelector((state) => state.project.openProject);
	const activeProject = useSelector((state) => state.project.activeProject);
	const resolvedProject = useSelector((state) => state.project.resolvedProject);

	let data;

	data = [
		{ name: "Open project", value: openProject.length },
		{ name: "Ongoing project", value: activeProject.length },
		{ name: "Finished projects", value: resolvedProject.length },
	];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill='white'
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline='central'
			>
				{`${(percent * 100).toFixed(0)}%`}
				{data[index].name}
			</text>
		);
	};
	return (
		<div className='flex flex-col md:flex-row'>
			<div className='md:min-h-screen md:w-80 xl:w-96'>
				<Navbar></Navbar>
			</div>

			<div className='flex flex-col justify-between w-full'>
				<div className='mt-8'>
					<div>
						<p className=' mt-10 mb-2 text-4xl font-base text-center uppercase'>
							All Project Analytics
						</p>
						<div className='flex justify-center'>
							<div className=' bg-brand-2 h-px w-20 mb-5'></div>
						</div>
					</div>
					<ResponsiveContainer width='100%' height={800} className='mx-auto container'>
						<PieChart width={800} height={800}>
							<Pie
								data={data}
								cx={"50%"}
								cy={"50%"}
								labelLine={false}
								label={renderCustomizedLabel}
								innerRadius='25%'
								outerRadius='100%'
								fill='#8884d8'
								dataKey='value'
								paddingAngle={3}
							>
								{data?.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<Footer></Footer>
			</div>
		</div>
	);
};

export default Analytics;
