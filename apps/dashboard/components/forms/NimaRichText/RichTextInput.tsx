import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { $generateHtmlFromNodes } from '@lexical/html';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { TRANSFORMERS } from '@lexical/markdown';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import React, { useEffect } from 'react';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import exampleTheme from './RichTextTheme';

function Placeholder() {
	return <div className="nima-richtext-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
	namespace: 'nima',
	// The editor theme
	theme: exampleTheme,
	// Handling of errors during update
	onError(error) {
		throw error;
	},
	// readOnly:true,

	// Any custom nodes go here
	nodes: [
		HeadingNode,
		ListNode,
		ListItemNode,
		QuoteNode,
		CodeNode,
		CodeHighlightNode,
		TableNode,
		TableCellNode,
		TableRowNode,
		AutoLinkNode,
		LinkNode,
	],
};

function MyCustomAutoFocusPlugin(props: {
	onHtmlChange: (html: string, raw: any) => void
}) {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		editor.registerUpdateListener(({ editorState }) => {

			editor.update(() => {
				const tmp = $generateHtmlFromNodes(editor);
				props.onHtmlChange(tmp, editor.toJSON());

			});
		});
	}, [editor]);


	return null;
}


export function RichTextInput(props: { init: any, onChange: (html: string, raw: any) => void }) {
	return (
		<LexicalComposer initialConfig={ editorConfig }>
			<div className="nima-richtext-container">
				<ToolbarPlugin/>
				<div className="nima-richtext-inner">
					<RichTextPlugin
						initialEditorState={ props.init?.editorState ? JSON.stringify(props.init.editorState) : undefined }
						contentEditable={ <ContentEditable className="nima-richtext-input"/> }
						placeholder={ <Placeholder/> }
					/>
					<HistoryPlugin/>
					<CodeHighlightPlugin/>
					<ListPlugin/>
					<LinkPlugin/>
					<AutoLinkPlugin/>
					<MyCustomAutoFocusPlugin onHtmlChange={ (html, raw) => props.onChange(html, raw) }/>
					<ListMaxIndentLevelPlugin maxDepth={ 7 }/>
					<MarkdownShortcutPlugin transformers={ TRANSFORMERS }/>
				</div>
			</div>
		</LexicalComposer>
	);
}
