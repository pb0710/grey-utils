// TODO:
function escape(str: any): string {
	return String(str)
}
/**
 * 简单封装一层 SQL 语句。支持链式调用。
 */
type QueryFunc = (sql: string) => Promise<any>
export default class SQL {
	private queryFunc?: QueryFunc
	private sql: string
	constructor(query?: QueryFunc) {
		this.queryFunc = query
		this.sql = ''
	}

	public reset(): this {
		this.sql = ''
		return this
	}

	/**
	 * 调用此方法表示 SQL 语句拼接结束，随即进行 query 操作。
	 */
	public end<R>(): Promise<R> | string {
		const result = `${this.sql.trim()};`
		return this.queryFunc?.(result) ?? result
	}

	/**
	 * 由于封装的 mysql 方法覆盖不到所有 SQL 语句，所以此 API 允许拼接自定义语句到当前 SQL 后边，方便使用。
	 * @param sql 自定义的 SQL 语句
	 */
	public native(sql: string): this {
		this.sql += sql
		return this
	}

	/**
	 * SELECT
	 * @param args
	 */
	public select(...args: string[]): this {
		this.sql += ` SELECT ${args.join(', ')}`
		return this
	}

	/**
	 * FROM
	 * @param table
	 */
	public from(table: string): this {
		this.sql += ` FROM ${table}`
		return this
	}

	/**
	 * WHERE
	 */
	public where(): this {
		this.sql += ` WHERE `
		return this
	}

	/**
	 * =
	 * @param a
	 * @param b
	 */
	public equal(key: string, value: unknown): this {
		this.sql += `${key} = ${escape(value)}`
		return this
	}

	/**
	 * LIKE
	 * @param value
	 * @param keywords
	 */
	public like(value: string, keywords: string): this {
		this.sql += `${value} LIKE ${escape(keywords)}`
		return this
	}

	/**
	 * OR
	 */
	public or(): this {
		this.sql += ` OR `
		return this
	}

	/**
	 * LIMIT
	 * @param condition
	 */
	public limit(condition?: number): this {
		if (!condition) return this

		this.sql += ` LIMIT ${condition}`
		return this
	}

	/**
	 * UPDATE
	 * @param table
	 */
	public update(table: string): this {
		this.sql += ` UPDATE ${table}`
		return this
	}

	/**
	 * SET
	 * @param values
	 */
	public set(values: Record<string, unknown>): this {
		const valuesArr = Object.keys(values)
		const setStatement = valuesArr
			.map((key, index) => {
				const newValue = escape(values[key])
				const isLast = index === valuesArr.length - 1
				return `${key} = ${newValue}${isLast ? '' : `, `}`
			})
			.join('')

		this.sql += ` SET ${setStatement}`
		return this
	}

	/**
	 * INSERT INTO
	 * @param table
	 */
	public insertInto(table: string): this {
		this.sql += ` INSERT INTO ${table}`
		return this
	}

	/**
	 * ORDER BY
	 * @param key
	 */
	public orderBy(key: string): this {
		this.sql += ` ORDER BY ${key}`
		return this
	}

	/**
	 * DESC
	 */
	public desc(): this {
		this.sql += ` DESC`
		return this
	}

	/**
	 * ASC
	 */
	public asc(): this {
		this.sql += ` ASC`
		return this
	}

	/**
	 * DELETE
	 */
	public delete(): this {
		this.sql += ` DELETE`
		return this
	}

	/**
	 * CREATE TABLE
	 * @param tableName
	 * @param column
	 */
	public createTable(tableName: string, column: string[]): this {
		const columnStr = column.length > 0 ? ` (${column.join(', ')})` : ''
		this.sql += ` CREATE TABLE ${tableName}${columnStr}`
		return this
	}
}
