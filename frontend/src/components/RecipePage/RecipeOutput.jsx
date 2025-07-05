import ReactMarkdown from 'react-markdown';

const RecipeOutput = ({ recipe }) => {
  return (
    <div className="border p-6 rounded-xl bg-white shadow-sm min-h-[120px] text-base leading-relaxed transition-all">
      {recipe ? (
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold text-purple-800 mb-3" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold text-purple-700 mt-5 mb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-semibold text-purple-600 mt-4 mb-2" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-3 text-gray-800" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc ml-6 space-y-1 text-gray-700" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal ml-6 space-y-1 text-gray-700" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="mb-1" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold text-black" {...props} />
            ),
            code: ({ node, ...props }) => (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-purple-700 text-sm" {...props} />
            ),
            br: () => <br />,
          }}
        >
          {recipe}
        </ReactMarkdown>
      ) : (
        <p className="text-gray-400 italic">Your recipe will appear here once generated...</p>
      )}
    </div>
  );
};

export default RecipeOutput;
