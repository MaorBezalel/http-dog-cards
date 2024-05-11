import './Spinner.css';

export default function Spinner() {
    return (
        <div className="progress">
            <div className="progress__ring" role="progressbar" tabIndex="0"></div>
        </div>
    );
}
