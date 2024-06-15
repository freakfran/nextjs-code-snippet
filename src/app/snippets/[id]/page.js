import {db} from "@/db";
import {notFound} from "next/navigation";
import Link from "next/link";
import * as actions from "@/actions";

export default async function SnippetShowPage(props) {
    //展示加载页面
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const snippet = await db.snippet.findUnique({
        where: {
            id: parseInt(props.params.id)
        }
    });

    const deleteSnippetAction = actions.deleteSnippet.bind(null, parseInt(props.params.id));

    if (!snippet) {
        return notFound();
    }
    return (
        <div>
            <div className="flex items-center justify-between m-4">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="p-2 rounded border">Edit</Link>
                    <form action={deleteSnippetAction}>
                        <button type="submit" className="p-2 rounded border">Delete</button>
                    </form>

                </div>
            </div>
            <pre className="border rounded p-3 bg-gray-200 border-gray-200">
                <code>
                    {snippet.code}
                </code>
            </pre>
        </div>

    );
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();
    return snippets.map((snippet) => ({
        id: snippet.id.toString()
    }));
}