package lib

import "encore.dev/types/uuid"

func ChainUUIDV5(namespace uuid.UUID, subjects ...string) uuid.UUID {
	if len(subjects) == 0 {
		panic("chainUUIDV5: no subjects provided")
	}

	final := namespace
	for _, subject := range subjects {
		final = uuid.NewV5(final, subject)
	}
	return final
}
