import { counties } from "../features/report/IncidentReportForm";

const countyList = counties;

function DashboardCards() {
    return (
       <>
            {/* Cards */}
            
        <div className="grid grid-cols-3 gap-8 mb-8">
        {Object.entries(countyList).map(([id, name]) => (
          <div key={id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-2xl">{Math.floor(Math.random() * 10000)}</p> {/* Placeholder number */}
          </div>
        ))}
          
        </div>
        
       </>
    )
}

export default DashboardCards
