import ReactMarkdown from 'react-markdown';

const RecipeOutput = ({ recipe }) => (
  <div className="border p-4 rounded-md bg-gray-50 min-h-[100px] text-sm leading-relaxed">
    {recipe ? (
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold text-purple-700 mt-4 mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-semibold text-purple-600 mt-3 mb-1" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-2 text-gray-800" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-6 space-y-1 text-gray-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-1" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-black" {...props} />
          )
        }}
      >
        {recipe}
      </ReactMarkdown>
    ) : (
      <p className="text-gray-400">Your recipe will appear here...</p>
    )}
  </div>
);

export default RecipeOutput;
