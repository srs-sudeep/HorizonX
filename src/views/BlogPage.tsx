import { Card, CardContent, CardHeader, CardTitle } from '@/components';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React 18',
      excerpt: 'Learn about the new features in React 18 and how to use them in your applications.',
      date: 'May 12, 2023',
      author: 'John Smith',
      category: 'React',
    },
    {
      id: 2,
      title: 'Understanding TypeScript Generics',
      excerpt:
        'A comprehensive guide to TypeScript generics and how they can make your code more reusable.',
      date: 'April 28, 2023',
      author: 'Jane Doe',
      category: 'TypeScript',
    },
    {
      id: 3,
      title: 'Modern CSS Techniques',
      excerpt:
        'Explore modern CSS techniques like Grid, Flexbox, and CSS Variables for better layouts.',
      date: 'April 15, 2023',
      author: 'Mark Johnson',
      category: 'CSS',
    },
    {
      id: 4,
      title: 'Building Accessible Web Applications',
      excerpt:
        'Guidelines and best practices for building accessible web applications for everyone.',
      date: 'March 30, 2023',
      author: 'Sarah Williams',
      category: 'Accessibility',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            <div className="h-40 bg-gray-200"></div>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <span className="text-sm">{post.author}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">Read more →</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
