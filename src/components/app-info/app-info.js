import "./app-info.css";

const AppInfo = (props) => {

    const {empCount, incrCount} = props;

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании L</h1>
            <h2>Общее число сотрудников: {empCount}</h2>
            <h2>Премию получат: {incrCount}</h2>
        </div>
    )
}

export default AppInfo;