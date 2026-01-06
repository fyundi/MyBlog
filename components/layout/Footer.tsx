export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} 游戏开发随记
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            记录开发过程中的技术笔记与实践经验
          </p>
        </div>
      </div>
    </footer>
  )
}
