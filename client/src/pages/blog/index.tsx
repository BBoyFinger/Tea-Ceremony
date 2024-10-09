import React, { useState, useEffect } from "react";
import { FaSearch, FaSort, FaFilter, FaSpinner } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    // Simulating API call
    const newPosts: Post[] = [
      {
        id: 1,
        title: "The Future of AI in Web Development",
        summary:
          "Exploring the impact of artificial intelligence on web development practices and tools.",
        content:
          "Artificial Intelligence is revolutionizing the way we approach web development. From automated coding assistants to intelligent design systems, AI is streamlining processes and enhancing creativity in unprecedented ways. This post delves into the current state of AI in web development and projects future trends that will shape the industry.",
        date: "2023-06-15",
        category: "Technology",
        tags: ["AI", "Web Development", "Future Tech"],
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
      {
        id: 2,
        title: "Mastering Responsive Design Techniques",
        summary:
          "A comprehensive guide to creating fluid and adaptive layouts for modern web applications.",
        content:
          "Responsive design is no longer optional in today's multi-device world. This in-depth guide covers advanced techniques for creating truly adaptive layouts that provide an optimal user experience across all screen sizes. From fluid grids to flexible images and media queries, we'll explore the tools and methodologies that make responsive design possible and efficient.",
        date: "2023-06-10",
        category: "Design",
        tags: ["Responsive Design", "CSS", "UX"],
        image:
          "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      },
      {
        id: 3,
        title: "The Rise of Jamstack Architecture",
        summary:
          "Understanding the benefits and implementation of Jamstack for modern web applications.",
        content:
          "Jamstack architecture is gaining momentum in the web development world, offering improved performance, scalability, and developer experience. This post examines the core principles of Jamstack, its advantages over traditional architectures, and provides practical examples of how to implement Jamstack in your projects. We'll also discuss popular tools and frameworks that complement the Jamstack approach.",
        date: "2023-06-05",
        category: "Development",
        tags: ["Jamstack", "Web Architecture", "Performance"],
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      },
    ];
    setTimeout(() => {
      setPosts(newPosts);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: any) => {
    setSearchQuery(query);
  };

  const handleSort = (criteria: any) => {
    setSortBy(criteria);
  };

  const handleFilter = (category: any) => {
    setFilterBy(category);
  };

  const toggleExpandPost = (postId: any) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search blogs"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="flex items-center">
          <FaSort className="mr-2" />
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSort(e.target.value)}
            aria-label="Sort posts"
          >
            <option value="date">Sort by Date</option>
            <option value="popularity">Sort by Popularity</option>
          </select>
        </div>
        <div className="flex items-center">
          <FaFilter className="mr-2" />
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilter(e.target.value)}
            aria-label="Filter posts"
          >
            <option value="all">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post?.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
              <img
                src={post?.image}
                alt={post?.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
                <button
                  onClick={() => toggleExpandPost(post.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  aria-expanded={expandedPost === post.id}
                  aria-controls={`content-${post.id}`}
                >
                  {expandedPost === post.id ? "Read Less" : "Read More"}
                </button>
                {expandedPost === post.id && (
                  <div className="mt-4" id={`content-${post.id}`}>
                    <p className="text-gray-700">{post.content}</p>
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={fetchPosts}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          aria-label="Load more posts"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
