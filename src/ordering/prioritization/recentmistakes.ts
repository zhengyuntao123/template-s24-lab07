import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  function lastSuccess (cardStatus: CardStatus): boolean {
    const lastElement = cardStatus.getResults().pop()
    return lastElement !== undefined ? lastElement : false
  }
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const c = cards.slice()
      // 接收两个参数，希望a排在b之前返回-1，希望a在b之后返回1，希望a和b等价返回0
      c.sort((a, b) =>
        !lastSuccess(a) && lastSuccess(b) ? -1 : (lastSuccess(a) && !lastSuccess(b) ? 1 : 0)
      )
      return c
    }
  }
};

export { newRecentMistakesFirstSorter }
