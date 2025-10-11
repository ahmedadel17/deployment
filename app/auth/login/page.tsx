import Login from '@/components/login/login'

function Page() {
  return (
    <div>
        <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[15px] text-slate-500">Enter your phone number to get started</p>
    </header>
      <Login/>
    </div>
  )
}

export default Page
