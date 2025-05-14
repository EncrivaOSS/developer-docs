import { source } from '@/lib/source';
import {
	DocsPage,
	DocsBody,
	DocsDescription,
	DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDXContent = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			tableOfContent={{
				style: "clerk"
			}}
			editOnGithub={{
				owner: "EncrivaOSS",
				repo: "developer-docs",
				sha: "main",
				path: `content/docs/${params.slug?.join("/")}.mdx`,
			}}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDXContent
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const image = {
		url: ['/og', ...(params.slug || [])].join('/'),
		width: 1200,
		height: 630,
	};

	return {
		title: page.data.title + " — Encriva for Developers",
		description: page.data.description,
		openGraph: {
			title: page.data.title + " — Encriva for Developers",
			description: page.data.description,
			images: [image]
		},
		twitter: {
			card: "summary_large_image",
			creator: "@notclqu",
			title: page.data.title + " — Encriva for Developers",
			description: page.data.description,
			images: [image]
		}
	};
}
