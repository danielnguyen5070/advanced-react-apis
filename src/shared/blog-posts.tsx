const blogPosts = [
	{
		id: 'cc96d5325894a',
		title: 'The Joy of Owning a Dog',
		color: '#F7DDD2',
		description:
			'Discover the happiness and companionship that comes with owning a dog.',
		tags: ['dog', 'happiness'],
	},
	{
		id: 'b912d5c6674bb',
		title: 'Caring for Your Feline Friend',
		color: '#F3F3E9',
		description:
			'Learn how to provide the best care for your beloved cat (not caterpillar).',
		tags: ['cat', 'care', 'caterpillar'],
	},
	{
		id: 'ed9189302b665',
		title: 'The Fascinating World of Caterpillars',
		color: '#CFDC26',
		description:
			'Explore the incredible transformation of caterpillars into beautiful butterflies.',
		tags: ['caterpillar', 'butterfly'],
	},
	{
		id: '6903727b0009e',
		title: 'Training Your Dog: Tips and Tricks',
		color: '#ffffff',
		description:
			'Discover effective techniques to train your dog and build a strong bond.',
		tags: ['dog', 'training'],
	},
	{
		id: 'c631e68546bf3',
		title: 'Cat Breeds: Choosing the Perfect Companion',
		color: '#14ACC8',
		description:
			'Find the ideal cat breed that matches your lifestyle and personality.',
		tags: ['cat', 'breeds'],
	},
	{
		id: '0c2ef14638642',
		title: 'The Life Cycle of a Butterfly',
		color: '#0F889B',
		description:
			"Learn about the stages of a butterfly's life and its importance in nature.",
		tags: ['caterpillar', 'butterfly'],
	},
	{
		id: 'd75f1c4c29da1',
		title: 'Dog Health: Common Issues and Prevention',
		color: '#E895D2',
		description:
			'Discover how to keep your dog healthy and prevent common health problems.',
		tags: ['dog', 'health'],
	},
	{
		id: '537c25b372465',
		title: 'Cat Behavior: Understanding Your Feline Friend',
		color: '#BF8BB9',
		description:
			'Gain insights into the behavior of cats, why some hate dogs, and how to strengthen your bond with them.',
		tags: ['cat', 'behavior', 'dog'],
	},
	{
		id: '12556f3115f1',
		title: 'Gardening for Caterpillars: Creating a Butterfly Haven',
		color: '#C1DBDC',
		description:
			'Learn how to create a garden that attracts caterpillars and supports butterfly populations.',
		tags: ['caterpillar', 'gardening'],
	},
	{
		id: '405654d99d80d',
		title: 'Dog-Friendly Activities: Fun Adventures for You and Your Pup',
		color: '#B2D1CA',
		description:
			'Discover exciting activities to enjoy with your dog and create lasting memories.',
		tags: ['dog', 'activities'],
	},
] as const

export type BlogPost = (typeof blogPosts)[number]

export function getMatchingPosts(query: string) {
	const words = query.split(' ').map(w => w.trim())
	return blogPosts.filter(post => {
		if (!query) return true
		return (
			words.every(word => post.tags.some(tag => tag === word)) ||
			post.title.toLowerCase().includes(query.toLowerCase()) ||
			post.description.toLowerCase().includes(query.toLowerCase())
		)
	})
}
