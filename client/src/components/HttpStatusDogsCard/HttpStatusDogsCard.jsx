import './HttpStatusDogsCard.css';

export default function HttpStatusDogsCard({ image, status_code, description }) {
    return (
        <div className="http-status-dogs__card">
            <img
                src={image ?? 'https://http.dog/100.jpg'}
                alt={`${status_code} ${description}` ?? '100 Continue'}
                className="http-status-dogs__card--image"
            />
            <section style={{ display: 'flex' }}>
                <p>Status Code:&nbsp;</p>
                <p className="http-status-dogs__card--value">{status_code ?? '100'}</p>
            </section>
            <section style={{ display: 'flex' }}>
                <p>Description:&nbsp;</p>
                <p className="http-status-dogs__card--value">{description ?? 'Continue'}</p>
            </section>
        </div>
    );
}
