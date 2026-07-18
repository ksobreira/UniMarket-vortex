import {Link} from 'react-router-dom'
import {Recycle} from 'lucide-react'

export function Logo(){
    return (
        <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                <Recycle className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-ink text-lg">UniMarket</span>
        </Link>
    )
}