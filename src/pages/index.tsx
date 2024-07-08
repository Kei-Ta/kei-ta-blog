import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../lib/posts';

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
};

const Home = ({ allPostsData }: { allPostsData: { id: string; date: string; title: string }[] }) => {
    return (
        <div>
            <h1>My Blog</h1>
            <ul>
                {allPostsData.map(({ id, date, title }) => (
                    <li key={id}>
                        <a href={`/posts/${id}`}>{title}</a>
                        <br />
                        <small>{date}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
