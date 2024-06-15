'use server';

import {db} from "@/db";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function editSnippet(id, code) {
    await db.snippet.update({
        where: {
            id: id,
        },
        data: {
            code: code,
        },
    });
    revalidatePath(`/snippets/${id}`);
    revalidatePath(`/snippets/${id}/edit`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id) {
    await db.snippet.delete({
        where: {
            id: id,
        },
    });
    revalidatePath('/');
    redirect('/');
}

export async function createSnippet(formStata, formData) {
    try {
        //检查用户输入
        const title = formData.get('title');
        const code = formData.get('code');
        if (!title) {
            return {message: '标题不能为空'};
        }
        if (!code) {
            return {message: '代码不能为空'};
        }
        //与数据库交互,创建snippet
        await db.snippet.create({
            data: {
                title,
                code,
            }
        });

    } catch (e) {
        if (e instanceof Error) {
            return {message: e.message};
        } else {
            return {message: '未知错误'};
        }
    }
    revalidatePath('/');
    //重定向回首页
    redirect('/');

}