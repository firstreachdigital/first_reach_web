
import { useEffect, useState, useCallback } from "react";
import {
  Table, Button, Modal, Form, Input, Switch, Space,
  Tag, Popconfirm, Tooltip, Select, App, theme
} from "antd";
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  EyeOutlined, EyeInvisibleOutlined,
  BoldOutlined, ItalicOutlined, UnderlineOutlined,
  OrderedListOutlined, UnorderedListOutlined,
  LinkOutlined, DisconnectOutlined,
} from "@ant-design/icons";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import API from "../api/axios";

const { TextArea } = Input;

/* ─── Toolbar button ────────────────────────────────────────────── */
function ToolbarBtn({ active, onClick, icon, title, danger }) {
  const { token } = theme.useToken();
  return (
    <Tooltip title={title}>
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        style={{
          width: 30, height: 28,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 13,
          background: active ? `${token.colorPrimary}22` : "transparent",
          color: danger
            ? token.colorError
            : active
              ? token.colorPrimary
              : token.colorTextSecondary,
          transition: "all 0.15s",
        }}
      >
        {icon}
      </button>
    </Tooltip>
  );
}

function ToolbarDivider() {
  const { token } = theme.useToken();
  return (
    <span style={{
      display: "inline-block", width: 1, height: 18,
      background: token.colorBorderSecondary,
      margin: "0 4px", verticalAlign: "middle",
    }} />
  );
}

/* ─── Rich text editor (Tiptap) ─────────────────────────────────── */
function RichTextEditor({ value, onChange }) {
  const { token } = theme.useToken();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: [
          "min-height: 220px",
          "padding: 12px 14px",
          "outline: none",
          "font-size: 14px",
          "line-height: 1.75",
          `color: ${token.colorText}`,
          "font-family: inherit",
        ].join(";"),
      },
    },
  });

  // Sync external value changes only on first meaningful load
  // (key-based remounting handles most cases — this covers edge cases)
  useEffect(() => {
    if (!editor || !value) return;
    const current = editor.getHTML();
    if (current === "<p></p>" || current === "") {
      editor.commands.setContent(value, false);
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href || "";
    const url  = window.prompt("Enter URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div style={{
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      overflow: "hidden",
      background: token.colorBgContainer,
    }}>
      <style>{`
        .tiptap-editor h2 { font-size: 1.35em; font-weight: 700; margin: .75em 0 .3em; }
        .tiptap-editor h3 { font-size: 1.1em;  font-weight: 600; margin: .65em 0 .3em; }
        .tiptap-editor blockquote {
          border-left: 3px solid ${token.colorPrimary};
          margin: 10px 0; padding: 4px 14px;
          color: ${token.colorTextSecondary};
          font-style: italic;
        }
        .tiptap-editor code {
          background: ${token.colorFillTertiary};
          color: ${token.colorError};
          border-radius: 3px; padding: 1px 5px; font-size: .9em;
        }
        .tiptap-editor pre {
          background: ${token.colorFillSecondary};
          border-radius: 6px; padding: 12px 16px; overflow-x: auto; margin: 8px 0;
        }
        .tiptap-editor pre code { background: none; padding: 0; color: inherit; }
        .tiptap-editor a { color: ${token.colorPrimary}; text-decoration: underline; }
        .tiptap-editor ul, .tiptap-editor ol { padding-left: 20px; margin: 6px 0; }
        .tiptap-editor li + li { margin-top: 3px; }
        .tiptap-editor p { margin: 4px 0; }
        .tiptap-editor p.is-editor-empty:first-child::before {
          content: "Write your blog content here…";
          color: ${token.colorTextPlaceholder};
          pointer-events: none; float: left; height: 0;
        }
      `}</style>

      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2,
        padding: "6px 10px",
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        background: token.colorBgLayout,
      }}>
        {/* Heading selector */}
        <Select
          size="small"
          value={
            editor.isActive("heading", { level: 2 }) ? 2
            : editor.isActive("heading", { level: 3 }) ? 3
            : 0
          }
          onChange={(v) => {
            if (v === 0) editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: v }).run();
          }}
          options={[
            { value: 0, label: "Normal" },
            { value: 2, label: "Heading 2" },
            { value: 3, label: "Heading 3" },
          ]}
          style={{ width: 110, marginRight: 2 }}
          popupMatchSelectWidth={false}
        />

        <ToolbarDivider />

        <ToolbarBtn icon={<BoldOutlined />}      title="Bold (Ctrl+B)"      active={editor.isActive("bold")}      onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolbarBtn icon={<ItalicOutlined />}    title="Italic (Ctrl+I)"    active={editor.isActive("italic")}    onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolbarBtn icon={<UnderlineOutlined />} title="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <ToolbarBtn
          icon={<span style={{ fontSize: 11, fontWeight: 800, textDecoration: "line-through" }}>S</span>}
          title="Strikethrough" active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <ToolbarDivider />

        <ToolbarBtn icon={<UnorderedListOutlined />} title="Bullet list"   active={editor.isActive("bulletList")}  onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolbarBtn icon={<OrderedListOutlined />}   title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />

        <ToolbarDivider />

        <ToolbarBtn
          icon={<span style={{ fontSize: 16, lineHeight: 1, fontFamily: "Georgia, serif" }}>"</span>}
          title="Blockquote" active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarBtn
          icon={<span style={{ fontFamily: "monospace", fontSize: 12 }}>{`</>`}</span>}
          title="Code block" active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />

        <ToolbarDivider />

        <ToolbarBtn icon={<LinkOutlined />}       title="Insert / edit link" active={editor.isActive("link")} onClick={setLink} />
        {editor.isActive("link") && (
          <ToolbarBtn icon={<DisconnectOutlined />} title="Remove link" danger
            active={false} onClick={() => editor.chain().focus().unsetLink().run()}
          />
        )}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
function BlogsInner() {
  const { message } = App.useApp();
  const { token }   = theme.useToken();

  const [blogs, setBlogs]               = useState([]);
  const [loading, setLoading]           = useState(false);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editing, setEditing]           = useState(null);
  const [form]                          = Form.useForm();
  const [saving, setSaving]             = useState(false);
  const [contentValue, setContentValue] = useState("");
  const [contentError, setContentError] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/blogs/all");
      setBlogs(data);
    } catch { message.error("Failed to fetch blogs"); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setContentValue("");
    setContentError(false);
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      title: record.title, excerpt: record.excerpt, category: record.category,
      author: record.author, readTime: record.readTime,
      featuredImage: record.featuredImage,
      tags: record.tags?.join(", "), isPublished: record.isPublished,
    });
    setContentValue(record.content || "");
    setContentError(false);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const plain  = contentValue.replace(/<[^>]*>/g, "").trim();
      if (!plain) { setContentError(true); return; }

      setSaving(true);
      const payload = {
        ...values,
        content: contentValue,
        tags: values.tags
          ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };
      if (editing) {
        await API.put(`/blogs/${editing._id}`, payload);
        message.success("Blog updated");
      } else {
        await API.post("/blogs", payload);
        message.success("Blog created");
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      if (err?.response?.data?.message) message.error(err.response.data.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      message.success("Blog deleted");
      fetchBlogs();
    } catch { message.error("Delete failed"); }
  };

  const togglePublish = async (record) => {
    try {
      await API.put(`/blogs/${record._id}`, { isPublished: !record.isPublished });
      message.success(record.isPublished ? "Unpublished" : "Published");
      fetchBlogs();
    } catch { message.error("Failed to update"); }
  };

  const columns = [
    { title: "Title",     dataIndex: "title",       key: "title",       ellipsis: true, width: 260 },
    { title: "Category",  dataIndex: "category",    key: "category",    width: 120,
      render: (v) => <Tag color="blue">{v || "General"}</Tag> },
    { title: "Author",    dataIndex: "author",      key: "author",      width: 160 },
    { title: "Read Time", dataIndex: "readTime",    key: "readTime",    width: 110 },
    { title: "Status",    dataIndex: "isPublished", key: "isPublished", width: 110,
      render: (v) => v ? <Tag color="green">Published</Tag> : <Tag color="default">Draft</Tag> },
    { title: "Date",      dataIndex: "createdAt",   key: "createdAt",   width: 130,
      render: (v) => new Date(v).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) },
    {
      title: "Actions", key: "actions", width: 140,
      render: (_, record) => (
        <Space>
          <Tooltip title={record.isPublished ? "Unpublish" : "Publish"}>
            <Button type="text"
              icon={record.isPublished ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => togglePublish(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          </Tooltip>
          <Popconfirm title="Delete this blog?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, color: token.colorTextHeading }}>Blogs</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>New Blog</Button>
      </div>

      <Table rowKey="_id" columns={columns} dataSource={blogs}
        loading={loading} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />

      <Modal
        title={editing ? "Edit Blog" : "New Blog"}
        open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}
        okText={editing ? "Update" : "Create"} confirmLoading={saving}
        width={760}
        styles={{ body: { maxHeight: "74vh", overflowY: "auto", paddingRight: 4 } }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
            <Input placeholder="Blog title" />
          </Form.Item>

          <Form.Item name="excerpt" label="Excerpt">
            <TextArea rows={2} placeholder="Short description (max 300 chars)" maxLength={300} showCount />
          </Form.Item>

          <Form.Item
            label="Content" required
            validateStatus={contentError ? "error" : ""}
            help={contentError ? "Content is required" : null}
          >
            {/* key forces full remount when switching blogs so editor always has correct content */}
            <RichTextEditor
              key={editing?._id ?? 'new'}
              value={contentValue}
              onChange={(html) => { setContentValue(html); setContentError(false); }}
            />
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Form.Item name="category" label="Category">
              <Select placeholder="Select category" allowClear>
                {["Strategy","Design","Development","Marketing","Events","General"].map(c => (
                  <Select.Option key={c} value={c}>{c}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="author" label="Author">
              <Input placeholder="Author name" />
            </Form.Item>
            <Form.Item name="readTime" label="Read Time">
              <Input placeholder="e.g. 5 min read" />
            </Form.Item>
            <Form.Item name="tags" label="Tags (comma separated)">
              <Input placeholder="e.g. SEO, Design, React" />
            </Form.Item>
          </div>

          <Form.Item name="featuredImage" label="Featured Image URL">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item name="isPublished" label="Publish" valuePropName="checked">
            <Switch checkedChildren="Published" unCheckedChildren="Draft" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function Blogs() {
  return (
    <App>
      <BlogsInner />
    </App>
  );
}