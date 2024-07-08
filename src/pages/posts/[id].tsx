import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export const getStaticPaths: GetStaticPaths = async () => {
    const fileNames = fs.readdirSync(postsDirectory);
    const paths = fileNames.map(fileName => ({
        params: {
            id: fileName.replace(/\.md$/, '')
        }
    }));
    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const fullPath = path.join(postsDirectory, `${params!.id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
        props: {
            postData: {
                id: params!.id as string,
                contentHtml,
                ...matterResult.data
            }
        }
    };
};

const Post = ({ postData }: { postData: { title: string; contentHtml: string } }) => {
    return (
        <div>
            <h1>{postData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <Link href="/">
                <a>Top</a>
            </Link>
        </div>
    );
};

export default Post;
