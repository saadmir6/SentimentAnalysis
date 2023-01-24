import * as d3 from 'd3';
import './JsonFetching';

const PieChart= ({result})=>{

    const jsond = result
    
    if(jsond['Positive'] == 0 && jsond['Negative'] == 0 && jsond['Neutral'] == 0 ) {
        return (<div></div>)
    }
    
    var data = []
        for (let x in jsond){
            data.push(jsond[x])
            }

    const height = 400
    const width = 400
   
    let pie = d3.pie()(data)
    

    return (
        
        <div>
            <div className = "border">
            <div id='box_neg'><strong id='negative'>NEGATIVE</strong></div>
            <div id='box_pos'><strong id="positive">POSITIVE</strong></div>
            <div id='box_neut'><strong id="neutral">NEUTRAL</strong></div>
            </div>
              
        <svg id="my_data" height={height} width={width}>
            <g  transform={`translate(${width / 2}, ${height / 2})`}>
                <Slice pie= {pie} />  
            </g>
        </svg>
        </div>

    );
}

export default PieChart;

const Slice = props =>{
    let {pie} = props;

    let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(150)


    let interpolate = d3.interpolateRgbBasis(["#ff0000", "#FCFF9B", "#00e600"]);

    return pie.map((slice, index) => {
        let sliceColor = interpolate(index/(pie.length - 1));

        return <path d={arc(slice) } fill={sliceColor} />
    })

};

