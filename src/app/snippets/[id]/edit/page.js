import {db} from "@/db";
import {notFound} from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

export default async function SnippetEditPage(props) {
    const id = parseInt(props.params.id);

    const snippet = await db.snippet.findUnique({
        where: {
            id: id,
        },
    });

    if(!snippet){
        return notFound();
    }

    return (
        <div>
            <SnippetEditForm snippet={snippet}/>
        </div>
    );
}
export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();
    return snippets.map((snippet) => ({
        id: snippet.id.toString()
    }));
}
