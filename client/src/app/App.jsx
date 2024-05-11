import { useFetch } from '@hooks';
import HttpStatusDogsCard from '@components/HttpStatusDogsCard/HttpStatusDogsCard';
import ThemeModeToggle from '@components/ThemeModeToggle/ThemeModeToggle';
import Spinner from '@components/Spinner/Spinner';

import './App.css';

const SERVER_REQUEST_URL = 'http://localhost:3000/allHttpDogs';

export default function App() {
    const { fetchedData, fetchStatus, startFetch } = useFetch(null);

    return (
        <main>
            <header>
                <div className="header__inner container">
                    <ThemeModeToggle />
                    <hgroup className="header__heading">
                        <h1 className="header__title">HTTP Status Dogs - Clone Version</h1>
                        <p className="header__subtitle">
                            🐶 A collection of HTTP status code dogs 🐶
                        </p>
                    </hgroup>
                </div>
            </header>

            <section
                className={`container ${
                    fetchStatus === 'after-fetch'
                        ? 'http-status-dogs-grid'
                        : 'http-status-dogs-fetch-button-container'
                }`}
            >
                {fetchStatus === 'before-fetch' && (
                    <button
                        className="http-status-dogs-fetch-button"
                        onClick={() => startFetch(SERVER_REQUEST_URL)}
                    >
                        Fetch HTTP Status Dogs
                    </button>
                )}
                {fetchStatus === 'fetching' && <Spinner />}
                {fetchStatus === 'error' && (
                    <p className="http-status-dogs-fetch-error">
                        Failed to fetch data from the server.
                    </p>
                )}
                {fetchStatus === 'after-fetch' &&
                    fetchedData?.map((data) => (
                        <HttpStatusDogsCard key={data.status_code} {...data} />
                    ))}
            </section>
        </main>
    );
}
