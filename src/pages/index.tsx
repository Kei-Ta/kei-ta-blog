import { GetStaticProps } from 'next';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

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
                        <Link href={`/posts/${id}`}>
                            <a>{title}</a>
                        </Link>
                        <br />
                        <small>{date}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
