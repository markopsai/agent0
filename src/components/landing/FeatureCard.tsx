import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="h-full glass-card-hover transition-all duration-300 group">
      <CardHeader className="text-center">
        <div className="w-14 h-14 rounded-xl bg-gray-100/80 backdrop-blur-sm mx-auto flex items-center justify-center mb-4 group-hover:bg-black group-hover:scale-110 transition-all duration-300">
          <span className="text-2xl group-hover:text-white transition-colors duration-300">
            {icon}
          </span>
        </div>
        <CardTitle className="text-lg mb-2 text-gray-900 group-hover:text-black transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base leading-relaxed text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
