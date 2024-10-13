import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BiLike, BiCommentDetail, BiShareAlt } from "react-icons/bi";

const BlogDetailsPage = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "Great article! Very informative.",
      likes: 5,
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "I learned a lot from this. Thanks for sharing!",
      likes: 3,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "Guest User",
          content: newComment,
          likes: 0,
        },
      ]);
      setNewComment("");
    }
  };

  const handleLike = (id: any) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-500 text-white p-2"
      >
        Skip to main content
      </a>
      <main id="main-content">
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Blog post featured image"
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              The Future of Web Development: Trends to Watch in 2023
            </h1>
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Author avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-600">
                  Published on May 15, 2023
                </p>
              </div>
            </div>
            <div className="prose max-w-none mb-6">
              <p className="mb-4">
                As we move further into 2023, the world of web development
                continues to evolve at a rapid pace. From new frameworks to
                innovative design trends, developers need to stay on top of the
                latest advancements to create cutting-edge websites and
                applications.
              </p>
              <p className="mb-4">
                In this article, we'll explore some of the most exciting trends
                that are shaping the future of web development. Whether you're a
                seasoned developer or just starting your journey, these insights
                will help you stay ahead of the curve and deliver exceptional
                digital experiences.
              </p>
              <h2 className="text-2xl font-semibold mb-2">
                1. Progressive Web Apps (PWAs)
              </h2>
              <p className="mb-4">
                Progressive Web Apps continue to gain traction, offering users
                an app-like experience directly through their web browsers. With
                improved performance, offline capabilities, and push
                notifications, PWAs are bridging the gap between web and native
                applications.
              </p>
              <h2 className="text-2xl font-semibold mb-2">
                2. AI-Powered Development Tools
              </h2>
              <p className="mb-4">
                Artificial Intelligence is making its way into development
                workflows, with tools that can generate code, optimize
                performance, and even predict user behavior. As these
                technologies mature, they'll become invaluable assets in a
                developer's toolkit.
              </p>
              {showMore && (
                <>
                  <h2 className="text-2xl font-semibold mb-2">
                    3. WebAssembly
                  </h2>
                  <p className="mb-4">
                    WebAssembly is revolutionizing web performance by allowing
                    developers to run low-level code in the browser at
                    near-native speed. This opens up new possibilities for
                    complex web applications and games.
                  </p>
                  <h2 className="text-2xl font-semibold mb-2">
                    4. Serverless Architecture
                  </h2>
                  <p className="mb-4">
                    Serverless computing is gaining popularity, allowing
                    developers to focus on writing code without worrying about
                    server management. This approach offers improved scalability
                    and potentially lower costs for many applications.
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-6"
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
            <div className="flex space-x-4 mb-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <FaFacebook />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-400">
                <FaTwitter />
                <span>Tweet</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-700">
                <FaLinkedin />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
                <FaInstagram />
                <span>Share</span>
              </button>
            </div>
          </div>
        </article>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Post Comment
            </button>
          </form>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{comment.author}</h3>
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                  >
                    <BiLike />
                    <span>{comment.likes}</span>
                  </button>
                </div>
                <p>{comment.content}</p>
                <div className="mt-2 flex space-x-4">
                  <button className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                    <BiCommentDetail />
                    <span>Reply</span>
                  </button>
                  <button className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                    <BiShareAlt />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogDetailsPage;
